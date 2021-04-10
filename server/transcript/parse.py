import itertools
import json
import os
import re
from pathlib import Path

from pdfreader import SimplePDFViewer


def getFile():
    script_location = Path(__file__).absolute().parent
    file = script_location / "transcript.pdf"
    fd = open(file, "rb")

    return fd


# HELPER FUNCTIONS
def initViewer(fd):
    # get absolute path of transcript to open

    # create viewer instance
    viewer = SimplePDFViewer(fd)
    return viewer


def pairwise(iterable):
    # s -> (s0,s1), (s1,s2), (s2, s3), ...
    a, b = itertools.tee(iterable)
    next(b, None)
    return zip(a, b)


# Function to convert
def listToString(s):
    # initialize an empty string
    str1 = ""

    for elem in s:
        str1 += elem

    # add strip before return
    return str1


# convert pdf text into a single string list
def convertPDFtoString(viewer):
    viewer.navigate(1)
    string = ""

    for canvas in viewer:
        separator = " "
        string = string + separator.join(canvas.strings)

    return string


# BUSINESS LOGIC FUNCTIONS
def getTermPairs(termsByYear, isTransferData=False):
    pairedList = list(pairwise(termsByYear))
    if termsByYear:
        if isTransferData:
            # i.e [(Fall 2009, Spring 2017), (Spring 2017, Beginning)]
            # gotta set the final pair with "beginning" because thats when the
            # transfer portion ends
            pairedList.append([termsByYear[len(termsByYear) - 1], "Beginning"])
        else:
            # gotta set the final pair with "End" because thats when the
            # transfer portion ends
            pairedList.append([termsByYear[len(termsByYear) - 1], "End"])
    else:
        return []

    return pairedList


def getTermsByYear(dataSectionText):
    termsByYear = []

    # append to term list if word matches
    for text in dataSectionText:
        matchedText = re.finditer(
            r"Fall \d{4}|Spring \d{4}|Summer \d{4}|Winter \d{4}", text
        )
        for term in matchedText:
            termsByYear.append(term.group())

    return termsByYear


def formatCourseData(string):
    courseDetails = string.split(" ")
    while "" in courseDetails:
        courseDetails.remove("")

    # remove earned point values
    courseDetails.pop(len(courseDetails) - 2)

    # separate out course department and number, description, and grade
    courseDetails[0:2] = [" ".join(courseDetails[0:2])]
    courseDetails[1 : len(courseDetails) - 2] = [
        " ".join(courseDetails[1 : len(courseDetails) - 2])
    ]

    return courseDetails


def getCourseInfo(termInfo, isTransferData=False):
    courses = []

    # filter out irrelevant data
    if isTransferData:
        termInfo = listToString(termInfo)

        for courseInfo in re.findall(r"(?<=Points).*?(?=Totals)", termInfo):
            # parse out individual course info
            for match in re.finditer(
                # first half of regex is saying ignore GPA and UNOFFICIAL, only match an uppercase word of length 3-4
                # second half is saying ignore any letter from [IEST], C++, GE, and LD, only match literally 325 or uppercase word of length 1-2
                # the 325 is hardcoded bc ryans crazy transcript. i have no idea how to filter out a numerical grade dynamically
                r"((?!GPA|UNOFFICIAL)\b[A-Z]{1,4}\b).*?((?![IEST]|C\+\+|GE|LD)((\b325\b)|(\b[A-Z]{1,2}\b)))",
                courseInfo,
            ):
                # parse out details
                courses.append(formatCourseData(match.group()))
            break
    else:
        termInfo = listToString(termInfo)

        for courseInfo in re.findall(r"(?<=Points).*?(?=Attempted)", termInfo):
            # parse out individual course info
            for match in re.finditer(
                # first half of regex is saying ignore GPA and UNOFFICIAL, only match an uppercase word of length 3-4
                # second half is saying ignore any letter from [IEST], C++, GE, and LD, only match literally 325 or uppercase word of length 1-2
                # the 325 is hardcoded bc ryans crazy transcript. i have no idea how to filter out a numerical grade dynamically
                r"((?!GPA|UNOFFICIAL)\b[A-Z]{1,4}\b).*?((?![IEST]|C\+\+|GE|LD)((\b325\b)|(\b[A-Z]{1,2}\b)))",
                courseInfo,
            ):
                courses.append(formatCourseData(match.group()))
            break

    return courses


def getTermInfo(dataSection, currentTerm):
    if dataSection:
        dataString = dataSection[0]
        termInfo = []

        # search for text in between pair (i.e Fall 2015 .... Spring 2016)
        for matchedText in re.findall(
            fr"(?<={currentTerm[0]}).*?(?={currentTerm[1]})", dataString
        ):
            termInfo.append(matchedText)

        return termInfo
    else:
        return []


def formatTranscriptData(
    studentId,
    transferText,
    transferTermsByYear,
    transferTermPair,
    csulbText,
    csulbTermsByYear,
    csulbTermPair,
):
    body = {"studentId": studentId, "transfer": {}, "csulb": {}}

    # populate transfer terms
    for term in transferTermPair:
        currentTermInfo = getTermInfo(transferText, term)
        # get courses for current term
        courses = getCourseInfo(currentTermInfo, isTransferData=True)

        ## hashmap
        termName = term[0].split(" ")[0]
        # make the current year in loop the key for map
        termYear = term[0].split(" ")[1]

        body["transfer"].setdefault(termYear, [])
        # append the term to the corresponding year
        body["transfer"][termYear].append({termName: courses})

    # populate csulb terms
    for term in csulbTermPair:
        currentTermInfo = getTermInfo(csulbText, term)
        # get courses for current term
        courses = getCourseInfo(currentTermInfo)

        ## hashmap
        termName = term[0].split(" ")[0]
        # make the current year in loop the key for map
        termYear = term[0].split(" ")[1]

        body["csulb"].setdefault(termYear, [])
        # append the term to the corresponding year
        body["csulb"][termYear].append({termName: courses})

    return body


def getTransferPdfText(pdfString):
    transferText = []

    # get all data between "Transfer Credits" and "Record" of transcript
    for matchedText in re.findall(fr"(?<=Transfer Credits).*?(?=Record)", pdfString):
        transferText.append(matchedText)

    return transferText


def getCsulbPdfText(pdfString):
    csulbText = []

    # get all data between "Beginning" and "End" of transcript
    for matchedText in re.findall(fr"(?<=Beginning).*?(?=End)", pdfString):
        csulbText.append(matchedText)

    return csulbText


def getStudentID(pdfString):
  studentId = re.search(r"\D(\d{9})\D", pdfString).group(1)

  return studentId


def getParsedData(viewer):
    pdfString = convertPDFtoString(viewer)

    studentId = getStudentID(pdfString)
    transferText = getTransferPdfText(pdfString)
    csulbText = getCsulbPdfText(pdfString)

    # current term will be empty because no grade yet
    transferTermsByYear = getTermsByYear(transferText)
    csulbTermsByYear = getTermsByYear(csulbText)

    transferTermPair = getTermPairs(transferTermsByYear, isTransferData=True)
    csulbTermPair = getTermPairs(csulbTermsByYear)

    data = formatTranscriptData(
        studentId,
        transferText,
        transferTermsByYear,
        transferTermPair,
        csulbText,
        csulbTermsByYear,
        csulbTermPair,
    )

    return data


if __name__ == "__main__":
    file = getFile()
    transcriptData = getParsedData(initViewer(file))
    print(json.dumps(transcriptData))

    # close and delete
    file.close()
    os.remove(file.name)

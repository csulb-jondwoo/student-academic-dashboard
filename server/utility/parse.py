import json
import re
import itertools
import pprint
import json
from pathlib import Path
from pdfreader import SimplePDFViewer


### HELPER FUNCTIONS
def initViewer():
    # get absolute path of transcript to open
    script_location = Path(__file__).absolute().parent
    file = script_location / "transcript.pdf"
    fd = open(file, "rb")

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


### BUSINESS LOGIC FUNCTIONS
def getTermPairs(termsByYear, isTransferDataSection=False):
    pairedList = list(pairwise(termsByYear))
    if isTransferDataSection:
        # i.e [(Fall 2009, Spring 2017), (Spring 2017, Beginning)]
        # gotta set the final pair with "beginning" because thats when the transfer portion ends
        pairedList.append([termsByYear[len(termsByYear) - 1], "Beginning"])
    else:
        # gotta set the final pair with "End" because thats when the transfer portion ends
        pairedList.append([termsByYear[len(termsByYear) - 1], "End"])

    return pairedList


def getTermsByYear(string):
    termsByYear = []

    # append to term list if word matches
    for text in string:
        matchedText = re.finditer(
            r"Fall \d{4}|Spring \d{4}|Summer \d{4}|Winter \d{4}", text
        )
        for term in matchedText:
            termsByYear.append(term.group())

    return termsByYear


# def getCourseInfo(termInfo):
#     courses = []
#     string = listToString(termInfo).strip()

#     filter out before and after course info
#     for courseInfo in re.findall(r"(?<=Points).*?(?=Attempted)", string):
#         # parse out individual course info
#         for match in re.finditer(
#             r"((?!GPA)[A-Z]{3,4}).*?(\b(?![IEST])(?!C\+\+)(?!GE)(?!LD)[A-Z]{1,2}\b)",
#             courseInfo.strip(),
#         ):
#             print(match.group())
#         break

#     return courseInfo


# parse and return list of courses for each term
# takes in a pair of terms because regex is searching for content between the two terms
def getTermInfo(dataSection, termPair):
    string = dataSection[0]
    termInfo = []

    # search for text in between pair (i.e Fall 2015 .... Spring 2016)
    for matchedText in re.findall(fr"(?<={termPair[0]}).*?(?={termPair[1]})", string):
        termInfo.append(matchedText)

    return termInfo


def getTransferData(pdfString):
    transferDataSection = []

    # get all data between "Transfer Credits" and "Record" of transcript
    for matchedText in re.findall(fr"(?<=Transfer Credits).*?(?=Record)", pdfString):
        transferDataSection.append(matchedText)

    termsByYear = getTermsByYear(transferDataSection)
    # edit the pairs to include most recent term
    pairedTermList = getTermPairs(termsByYear, isTransferDataSection=True)
    formattedData = formatData(termsByYear, pairedTermList, transferDataSection)

    return formattedData


def getCsulbData(pdfString):
    csulbDataSection = []

    # get all data between "Beginning" and "End" of transcript
    for matchedText in re.findall(fr"(?<=Beginning).*?(?=End)", pdfString):
        csulbDataSection.append(matchedText)

    termsByYear = getTermsByYear(csulbDataSection)
    # edit the pairs to include most recent term
    pairedTermList = getTermPairs(termsByYear)
    formattedData = formatData(termsByYear, pairedTermList, csulbDataSection)

    return formattedData


def formatData(termsByYear, pairedTermList, dataSection):
    data = []
    body = {}
    years = []
    terms = []

    # for each term, get term info
    for idx, term in enumerate(termsByYear):
        currentTermPair = pairedTermList[idx]
        termInfo = getTermInfo(dataSection, currentTermPair)

        # hashmap
        termName = term.split(" ")[0]
        termYear = term.split(" ")[1]  # make the current year in loop the key for map

        body.setdefault(termYear, [])

        body[termYear].append(  # map term to the corresponding year
            {termName: termInfo}  # map term info to term
        )

    # """
    # get course info by term
    # """
    # for currentTerm in pairedList:
    #     # print(currentTerm)
    #     currentTermInfo = getTermInfo(viewer, currentTerm)
    #     getCourseInfo(currentTermInfo)
    #     # print("-----------------------------------------------------------")

    data.append(body)

    return data


def getParsedData(viewer):
    data = []

    pdfString = convertPDFtoString(viewer)

    # current term will be empty because no grade yet
    transferData = getTransferData(pdfString)
    csulbData = getCsulbData(pdfString)

    return data


if __name__ == "__main__":
    contents = getParsedData(initViewer())
    # print(json.dumps(contents, indent=1))


"""
goal state:
[
    {
        '2015': 
            [
                {
                    transfer:
                        [
                            {
                                FALL: [data]
                            },
                            {
                                SPRING: [data]
                            }
                        ]
                },
                {
                    csulb:
                        [
                            {
                                FALL: [data]
                            },
                            {
                                SPRING: [data]
                            }
                        ]
                }
            ]
    },
    {
        '2016': 
            [
                {
                    transfer:
                        [
                            {
                                FALL: [data]
                            },
                            {
                                SPRING: [data]
                            }
                        ]
                },
                {
                    csulb:
                        [
                            {
                                FALL: [data]
                            },
                            {
                                SPRING: [data]
                            }
                        ]
                }
            ]
    },
    {
        '2017': 
            [
                {
                    transfer:
                        [
                            {
                                FALL: [data]
                            },
                            {
                                SPRING: [data]
                            }
                        ]
                },
                {
                    csulb:
                        [
                            {
                                FALL: [data]
                            },
                            {
                                SPRING: [data]
                            }
                        ]
                }
            ]
    },
]
"""
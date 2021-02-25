import json
import re
import itertools
import pprint
import json
from pathlib import Path
from pdfreader import SimplePDFViewer


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


# get list of terms for all years enrolled (i.e Fall 2015)
def getTermsByYear(viewer):
    viewer.navigate(1)
    termsByYear = []

    # loop through each page
    for canvas in viewer:
        # loop through each word of the page
        for term in canvas.strings:
            # append to term list if word matches
            if re.search(r"Fall \d{4}", term):
                termsByYear.append(term)
            elif re.search(r"Spring \d{4}", term):
                termsByYear.append(term)
            elif re.search(r"Summer \d{4}", term):
                termsByYear.append(term)
            elif re.search(r"Winter \d{4}", term):
                termsByYear.append(term)

    return termsByYear


# parse and return list of courses for each term
# takes in a pair of terms because regex is searching for content between the two terms
def getCoursesByTerm(viewer, pair):
    viewer.navigate(1)
    combinedString = ""
    coursesByTerm = []

    # convert pdf text into a single string
    for canvas in viewer:
        separator = " "
        combinedString = combinedString + separator.join(canvas.strings)

    # search for text in between pair (i.e Fall 2015 .... Spring 2016)
    for matchedText in re.findall(fr"(?<={pair[0]}).*?(?={pair[1]})", combinedString):
        coursesByTerm.append(matchedText)

    return coursesByTerm


def getParsedData(viewer):
    data = []
    body = {}
    years = []
    terms = []

    termsByYear = getTermsByYear(viewer)
    pairedList = list(pairwise(termsByYear))
    pairedList.append([termsByYear[len(termsByYear) - 1], "End"])

    # lay out yearly data
    for idx, term in enumerate(termsByYear):
        currentTerm = pairedList[idx]

        # hashmap
        termName = term.split(" ")[0]
        termYear = term.split(" ")[1]  # make the current year in loop the key for map
        body.setdefault(termYear, [])

        body[termYear].append(  # append the term to the corresponding year
            {termName: getCoursesByTerm(viewer, currentTerm)}
        )

    data.append(body)

    return data


if __name__ == "__main__":
    contents = getParsedData(initViewer())
    print(json.dumps(contents, indent=1))


"""
current state:
[
    {
        '2015': 
            [
                {
                    FALL: [data],
                },
                {
                    SPRING: [data],
                }
            ]
    },
    {
        '2016': 
            [
                {
                    FALL: [data],
                },
                {
                    SPRING: [data],
                }
            ]
    },
    {
        '2017': 
            [
                {
                    FALL: [data],
                },
                {
                    SPRING: [data],
                }
            ]
    },
]
"""
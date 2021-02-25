import json
import re
import itertools
import pprint
import json
from pathlib import Path
from pdfreader import SimplePDFViewer


"""
3. parse for terms for those years
4. parse for courses for those terms
"""


def initViewer():
    # get abs path of transcript to open
    script_location = Path(__file__).absolute().parent
    file = script_location / "transcript.pdf"
    fd = open(file, "rb")

    # create viewer instance
    viewer = SimplePDFViewer(fd)
    return viewer


# retreive all school years from transcript
def getYears(viewer):
    years = []

    for canvas in viewer:
        for string in canvas.strings:
            for year in string.split(" "):
                if re.search(r"^\d{4}$", year):
                    years.append(year)

    sortedYears = sorted(set(years))

    return sortedYears


# get contents from each page
def getContents(viewer):
    data = []

    years = getYears(viewer)

    for year in years:
        data.append({year: {}})

    return data


def pairwise(iterable):
    # s -> (s0,s1), (s1,s2), (s2, s3), ...
    a, b = itertools.tee(iterable)
    next(b, None)
    return zip(a, b)


if __name__ == "__main__":
    contents = getContents(initViewer())
    print(json.dumps(contents, indent=1))


"""
current state:
[
    {
        '2015': { },
    },
    {
        '2016': { },
    },
    {
        '2017': { },
    },
    {
        '2018': { },
    }
]



goal:
[
    {
        '2015': 
            {
                FALL: [data],
                SPRING: [data],
            },
    },
    {
        '2016': 
            {
                FALL: [data],
                SPRING: [data],
            },
    },
    {
        '2017': 
            {
                FALL: [data],
                SPRING: [data],
            },
    },
    {
        '2018': 
            {
                FALL: [data],
                SPRING: [data],
            },
    }
]
"""
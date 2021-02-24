import json
import re
import itertools
import pprint
import json
from pathlib import Path
from pdfreader import SimplePDFViewer


def initializeViewer():
    # get abs path of transcript to open
    script_location = Path(__file__).absolute().parent
    file = script_location / "transcript.pdf"
    fd = open(file, "rb")

    # create viewer instance
    viewer = SimplePDFViewer(fd)
    return viewer


# get contents from each page
def getContents(viewer):
    data = []

    for idx, canvas in enumerate(viewer):
        # page_text = canvas.text_content
        page_strings = canvas.strings
        data.append({f"page {idx+1}": page_strings})

    print(json.dumps(data, indent=1))


def pairwise(iterable):
    # s -> (s0,s1), (s1,s2), (s2, s3), ...
    a, b = itertools.tee(iterable)
    next(b, None)
    return zip(a, b)


if __name__ == "__main__":
    contents = getContents(initializeViewer())
    # print(json.dumps(contents, indent=1))


"""
current state:
[
    {
        'page 1':
            [
                data...
            ]
    },
    {
        'page 2': [data...]
    },
    {
        'page 3': [data...]
    }
]



goal:
[
    {
        'page 1':
            [
                {
                    'Fall 2015': [contents...]
                },
                {
                    'Spring 2016': [contents...]
                },
                {
                    'Fall 2016': [contents...]
                },
                ...
            ]
    },
    {
        'page 2': [contents...]
    },
    {
        'page 3': [contents...]
    }
]

"""
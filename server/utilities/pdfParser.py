import fitz
import json
import re
import itertools
import pprint
import json


from bs4 import BeautifulSoup


def pairwise(iterable):
    # s -> (s0,s1), (s1,s2), (s2, s3), ...
    a, b = itertools.tee(iterable)
    next(b, None)
    return zip(a, b)


def getContents():
    doc = fitz.open('transcript.pdf')
    pages = []

    # store each page contents to pages list
    for idx, page in enumerate(doc):
        text = page.getText('text')
        contents = text.splitlines()
        termIdxArray = []
        terms = []

        for line in contents:
            if re.search(r'Fall \d{4}', line):
                termIdxArray.append(contents.index(line))
                # terms.append({f'{contents[i]}': 'test'})
            elif re.search(r'Spring \d{4}', line):
                termIdxArray.append(contents.index(line))
                # terms.append({f'{contents[i]}': 'test'})
            elif re.search(r'Summer \d{4}', line):
                termIdxArray.append(contents.index(line))
                # terms.append({f'{contents[i]}': 'test'})
            elif re.search(r'Winter \d{4}', line):
                termIdxArray.append(contents.index(line))
                # terms.append({f'{contents[i]}': 'test'})

        # append index of last element of each page to termIdx
        lastElementOfPageIdx = contents.index(contents[len(contents) - 1])
        termIdxArray.append(lastElementOfPageIdx)
        for pair in list(pairwise(termIdxArray)):
            termContents = []
            for i in range(pair[0]+1, pair[1]):
                termContents.append(contents[i])
            terms.append({f'{contents[pair[0]]}': termContents})

        pages.append({f'page {idx+1}': terms})

    return pages


if __name__ == "__main__":
    contents = getContents()
    print(json.dumps(contents, indent=1))

"""
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

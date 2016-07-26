#!/usr/bin/env python2

from __future__ import print_function
import json, sys

if __name__ == '__main__':

    res = {}
    if sys.argv[1].lower() in ['bonjour', 'salut']:
        res["ok"] = True
        res["type"] = "greetings"

    print(json.dumps(res))

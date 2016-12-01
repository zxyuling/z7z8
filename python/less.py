#coding = utf-8
import re
less = open('F:/webdeveloper/z7z8/python/banner.less')
data = less.read()
data.replace('px','*@n px')
print(data)

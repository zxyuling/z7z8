#coding = utf-8
import re
import sys
import spider
name=1
def p(dom,url):
	global name
	if re.findall('400-188-6666',str(dom)):
		f = open('F:\\webdeveloper\\z7z8\\88\\'+str(name)+'.html','wb')
		f1 = open('F:\\webdeveloper\\z7z8\\88\\list.txt','a')
		f1.write(url)
		f.write(dom)
		name=name+1
print(sys.argv)
sp = spider.spider(sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),p)
sp.start()
print(sp.pagelist())
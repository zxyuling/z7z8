#coding = utf-8
import sys
import spider
name=1
def p(dom):
	global name
	f = open('F:\\webdeveloper\\z7z8\\88\\'+str(name)+'.html','wb')
	f.write(dom)
	name=name+1
print(sys.argv)
sp = spider.spider(sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),p)
sp.start()
print(sp.pagelist())
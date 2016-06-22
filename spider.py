import urllib.request
import re
import time
class spider:
	url=''
	urllist=[]
	urldoneset=set()
	def __init__(self,url):
		self.url = url
		self.urllist.append(url)
	def gethtmldom(self,url):
		try:
			page = urllib.request.urlopen(url,None,3)
			htmldom = page.read()
			return htmldom
		except:
			return ''
	def geturllist(self,url):
		tmpurl=re.findall('<a\s+[^>]*[\s]*href[\s]*=[\s]*[\'\"]([^>^\'^\"]*)[\'\"][\s]*[^>]*>',str(self.gethtmldom(url)))
		for x in tmpurl:
			x=re.subn('^\s*','',x)[0]
			if re.match('http',x,re.I):
				self.urllist.append(x)
			else:
				x=self.url+x;
				self.urllist.append(x)
		return self.urllist
	def urlpop(self):
		try:
			currenturl = self.urllist.pop()
			while currenturl in self.urllist or currenturl in self.urldoneset or re.match(self.url+'javascript',currenturl,re.I):
				currenturl = self.urllist.pop()
			return currenturl
		except:
			return 0
	def start(self):
		while len(self.urllist)!=0 or len(self.urldoneset)==0:
			t1=time.time()
			done=self.urlpop()
			self.geturllist(done)
			self.urldoneset.add(done)
			t2=time.time()
			print(done+':'+str(t2-t1))
		return self.urldoneset
s = spider('http://202.202.43.222/bysj')
try:
	print(s.start())
except:
	print(s.urllist)


#coding = utf-8
import urllib.request
import re
import time
import socket
import sys
class spider:
	allnet = 0;
	curl=''
	url=''
	urllist=[]
	urldoneset=set()
	timeout=3
	doSth = lambda self,dom:dom
	def __init__(self,url,allnet,timeout,callback=lambda dom:dom):
		self.url = url
		self.allnet = int(allnet)
		self.urllist.append(url)
		self.timeout=int(timeout)
		self.doSth=callback
	def gethtmldom(self,url):	#打开url获取网页dom
		try:
			req = urllib.request.Request(url);
			page = urllib.request.urlopen(req,timeout=self.timeout)
			self.curl = page.geturl()
			htmldom = page.read()
			self.doSth(htmldom)
			return htmldom
		except :
			print('getError')
			return '';
	def geturllist(self,url):	#将文档中包含的url通通加入到url列表中等待访问
		tmpurl=re.findall('<a\s+[^>]*[\s]*href[\s]*=[\s]*[\'\"]([^>^\'^\"]*)[\'\"][\s]*[^>]*>',str(self.gethtmldom(url)))#匹配文档中的url
		domain=re.findall(r'^(?:https?://)?[\w\.]*',self.curl)#获取该网页的域名
		finddomain=re.findall(r'^(?:https?://)?[\w\.]*',self.url)#获取需要搜索域名
		if self.allnet!=0 or domain[0]==finddomain[0]:
			for x in tmpurl:
				x=re.subn('^\s*','',x)[0]	#将url中的开头空白字符去掉
				x=re.subn(r'\\','/',x)[0]	#所有\换成/
				if re.match('http',x,re.I):	#如果该连接是以http开头的，丢进待访问列表
					sitedomain=re.findall(r'^(?:https?://)?[\w\.]*',x)
					if self.allnet!=0 or sitedomain[0]==domain[0]:
						self.urllist.append(x)
					else:
						pass
				elif re.match('^//',x,re.I):#如果该连接是以//开头，加上http丢入列表
					x='http:'+x
					sitedomain=re.findall(r'^(?:https?://)?[\w\.]*',x)
					if self.allnet!=0 or sitedomain[0]==domain[0]:
						self.urllist.append(x)
					else:
						pass
				elif len(re.findall('^#',x))!=0:#如果是锚点就丢弃
					pass
				else:					#不然加上判断是不是绝对路径
					if len(re.findall('^/',x))!=0:	#如果是绝对路径就加上域名丢进等待列表
						x=domain[0]+x
						self.urllist.append(x)
					else:									
						if url==domain[0]:
							x=url+'/'+x
							self.urllist.append(x);
						else:
							x=re.subn(r'(/[^/]*)$','/'+x,url)[0]
							self.urllist.append(x)
		else:
			pass
		return self.urllist
	def urlpop(self):
		try:
			currenturl = self.urllist.pop()
			while currenturl in self.urllist or currenturl in self.urldoneset:
				currenturl = self.urllist.pop()
			return currenturl
		except:
			print('urlpopError')
			return ''
	def start(self):
		done=self.url
		while len(self.urllist)!=0 or len(self.urldoneset)==0:
			t1=time.time()
			done=self.urlpop()
			if done=='':
				return self.urldoneset
			self.geturllist(done)
			self.urldoneset.add(done)
			t2=time.time()
			t=t2-t1
			print(done+'::::::'+str(t))
		return self.urldoneset
	def pagelist(self):
		return list(self.urldoneset)
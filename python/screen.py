#coding = gbk
from PIL import ImageGrab
from PIL import Image
from pytesseract import *
from unidecode import unidecode
import psutil
import re
import time
import tkinter
import win32gui
import win32api
import threading
import os
import cv2


def closeWin():
	os._exit(0)
def initWin(width=720,height=360):
	root = tkinter.Tk()
	root.attributes("-topmost",1)
	root.attributes("-alpha", 0.3)
	frame=tkinter.Frame(root,width=720,height=360)   
	frame.pack()
	root.protocol("WM_DELETE_WINDOW", closeWin)
	root.mainloop()

def getRect(winName):  
	return win32gui.GetWindowRect(win32gui.FindWindow(None, winName))
def readPic(image):
	try:
		text=pytesseract.image_to_string(Image.open(image),lang="eng")
		print(text)
	except:
		print('识别失败')
	
def sc():
	print(1)
	i=0
	while True:
		name = 'q.png'
		try:
			rect = getRect('tk')
		except:
			rect=(0,0,720,360)
		image = ImageGrab.grab(rect)
		image = image.convert('L')
		image = image.point(lambda x: 255 if x > 100 else 0)
		image = image.convert('1')
		#image.show()
		image.save(name)
		#image = cv2.imread(name)#读入图像
		#image = cv2.threshold(image, 50, 255, cv2.THRESH_BINARY) 
		#cv2.imshow("Origin", image) 
		#image = cv2.Canny(image,30,150)
		#cv2.waitKey()
		#cv2.imwrite(name, image)
		i=i+1
		readPic(name)
		time.sleep(0.01)

def main():
	win = threading.Thread(target=initWin, name='win')
	sct = threading.Thread(target=sc, name='sc')
	win.start()
	sct.start()
	win.join()
	sct.join()

#main()
readPic('./a.png')

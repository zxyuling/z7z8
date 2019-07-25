#-*- coding:utf-8 -*-
import BaseHTTPServer
import pyautogui
import thread
isMove = true

class RequestHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    # 处理一个GET请求
    def do_POST(self):
        self.send_response(200)
        self.send_header("Content-Type", "text/html")
        self.send_header("Content-Length", 2)
        self.end_headers()
        self.wfile.write('ok')
        datas = self.rfile.read(int(self.headers['content-length']))

        move()

#----------------------------------------------------------------------

#def moveMouse(speed):


#----------------------------------------------------------------------
if __name__ == '__main__':
    serverAddress = ('', 80)
    server = BaseHTTPServer.HTTPServer(serverAddress, RequestHandler)
    server.serve_forever()
    
  


def move():
    isMove = true
    while isMove:
        pyautogui.moveTo(10,10)

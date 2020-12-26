from pytesseract import *
from PIL import Image
text=pytesseract.image_to_string(Image.open('./aa.jpg'),lang="eng")

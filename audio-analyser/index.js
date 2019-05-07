const fileInput = document.querySelector('#file')
fileInput.addEventListener('change',()=>{
	an(fileInput.files[0])
})
const WIDTH = 1920
const HEIGHT = 400
const an = (file) => {
	const audioContext = new AudioContext();
	const analyser = audioContext.createAnalyser();
	const audioBufferSouceNode = audioContext.createBufferSource();
	audioBufferSouceNode.connect(audioContext.destination);
	audioBufferSouceNode.connect(analyser);
	const fsReader = new FileReader()
	fsReader.readAsArrayBuffer(file);
	const bufferLength = analyser.frequencyBinCount
	fsReader.onload = function(e){
		const fileResult = e.target.result;
		audioContext.decodeAudioData(fileResult, buffer=>{
			audioBufferSouceNode.buffer = buffer;
			audioBufferSouceNode.start(0);
			
			const array = new Uint8Array(bufferLength);
			draw(analyser,bufferLength,array)
           // analyser.getByteTimeDomainData(array);
		})
	}
}
const canvas = document.getElementById('canvas');
const canvasCtx = canvas.getContext('2d');
function draw(analyser,bufferLength,dataArray) {

  drawVisual = requestAnimationFrame(()=>draw(analyser,bufferLength,dataArray));
  analyser.getByteFrequencyData(dataArray);

  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

  var sliceWidth = WIDTH * 1.0 / bufferLength;
  var x = 0;

  canvasCtx.beginPath();
  for(var i = 0; i < bufferLength; i++) {
    let v = dataArray[i]/128.0,
        y = v * HEIGHT/2;

    if(i === 0)
      canvasCtx.moveTo(x, y);
    else
      canvasCtx.lineTo(x, y);

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height/2);
  canvasCtx.stroke();
};
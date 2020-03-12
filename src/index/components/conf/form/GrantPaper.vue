<template>
   <div class="pdfList">
		<canvas ref="canvas" ></canvas>
	</div>  
</template>
<script>
import PDFJS from 'pdfjs-dist'
export default {
	data(){
	  return {
		  pdfDataList:[]
		}
	},
	created() {
	    this.loading = false //这个是我为了判断图片是否加载成功，所添的参数
	    PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min.js')
    },
    mounted() {
    	this.showPdf()
  	},
  	methods:{
      	async showPdf(){
      		//这里是我用来请求后台返回给我返回base64格式的文件发的ajax请求
			var res= "JVBERi0xLjcKJcKzx9gNCjEgMCBvYmoNPDwvTmFtZXMgPDwvRGVzdHMgNCAwIFI+PiAvT3V0bGluZXMgNSAwIFIgL1BhZ2VzIDIgMCBSIC9UeXBlIC9DYXRhbG9nPj4NZW5kb2JqDTMgMCBvYmoNPDwvQXV0aG9yICgpIC9Db21tZW50cyAoKSAvQ29tcGFueSAoKSAvQ3JlYXRpb25EYXRlIChEOjIwMjAwMTE0MTY0NDQ2KzA4JzQ0JykgL0NyZWF0b3IgKP7/AFcAUABTACBvFHk6KSAvS2V5d29yZHMgKCkgL01vZERhdGUgKEQ6MjAyMDAxMTQxNjQ0NDYrMDgnNDQnKSAvUHJvZHVjZXIgKCkgL1NvdXJjZU1vZGlmaWVkIChEOjIwMjAwMTE0MTY0NDQ2KzA4JzQ0JykgL1N1YmplY3QgKCkgL1RpdGxlICgpIC9UcmFwcGVkIC9GYWxzZT4+DWVuZG9iag04IDAgb2JqDTw8L0FJUyBmYWxzZSAvQk0gL05vcm1hbCAvQ0EgMSAvVHlwZSAvRXh0R1N0YXRlIC9jYSAxPj4NZW5kb2JqDTYgMCBvYmoNPDwvQ29udGVudHMgNyAwIFIgL01lZGlhQm94IFswIDAgOTYwIDU0MF0gL1BhcmVudCAyIDAgUiAvUmVzb3VyY2VzIDw8L0V4dEdTdGF0ZSA8PC9HUzggOCAwIFI+Pj4+IC9UeXBlIC9QYWdlPj4NZW5kb2JqDTcgMCBvYmoNPDwvRmlsdGVyIC9GbGF0ZURlY29kZSAvTGVuZ3RoIDIyND4+DQpzdHJlYW0NCnicXVBJbgMxDHuB/uBzgCheqPH4BTkHPfQBRZbDpEDS/wORLKPJDATYpi2RNB+UQtTa2yaI4edOD7KbNvnF80zfu/CrfVbPqz4fjl9zuP5t2y47OlHkIjVEnuKs61xkPdKEI0KSGO6EXDjlDhYCKrcppAqu+Y1zmxlQ7IMb6KNDN4uoIlBMXXlXuqZlxhIaQ0wcytTl0ErXM2z8TYwfLBs0Rpct10I3tWNenFmtebOPyiCCIz1Xf+k/XEO8Ox32OAYSWDz6b0E3kblaYCpbIoat9O9j+fCkEWlCVi88G2NCDQplbmRzdHJlYW0NZW5kb2JqDTIgMCBvYmoNPDwvQ291bnQgMSAvS2lkcyBbNiAwIFJdIC9UeXBlIC9QYWdlcz4+DWVuZG9iag00IDAgb2JqDTw8L05hbWVzIFtdPj4NZW5kb2JqDTUgMCBvYmoNPDw+Pg1lbmRvYmoNeHJlZg0KMCA5DQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTYgMDAwMDAgbg0KMDAwMDAwMDg1OSAwMDAwMCBuDQowMDAwMDAwMTAzIDAwMDAwIG4NCjAwMDAwMDA5MTQgMDAwMDAgbg0KMDAwMDAwMDk0MyAwMDAwMCBuDQowMDAwMDAwNDM2IDAwMDAwIG4NCjAwMDAwMDA1NjIgMDAwMDAgbg0KMDAwMDAwMDM2NSAwMDAwMCBuDQp0cmFpbGVyPDwvU2l6ZSA5IC9Sb290IDEgMCBSIC9JbmZvIDMgMCBSIC9JRCBbPDJiNDY0ZTQzMTJkYjQyM2FhM2Y4ZGJiMzQwNzg0NjExPjxkODRmOWQ1NzExNTk0YzIwOWQ5MTdmN2IxNWNmZDhjMD5dPj4Nc3RhcnR4cmVmDTk2Mw0lJUVPRg0="
			 var obj = {
				 fileName:'1.pdf',
				 fileValue:res,
				 thumbnail:"",
			 }
			 this.pdfDataList.push(obj); 
			 let pdfList = document.querySelector('.pdfList') //通过querySelector选择DOM节点,使用document.getElementById()也一样
			for(let value of this.pdfDataList){ //遍历后台传过来的pdfDataList
				let base64 = value.fileValue //获得bas464编码
				let decodedBase64 = atob(base64) //使用浏览器自带的方法解码
				let pdf = await  PDFJS.getDocument({data: decodedBase64}) //返回一个pdf对象
				let pages = pdf.numPages //声明一个pages变量等于当前pdf文件的页数
				for (let i = 1; i <= pages; i++) { //循环页数
					let canvas = document.createElement('canvas') 
					let page = await pdf.getPage(i) //调用getPage方法传入当前循环的页数,返回一个page对象
					let scale = 1;//缩放倍数，1表示原始大小
					let viewport = page.getViewport(scale); 
					let context = canvas.getContext('2d'); //创建绘制canvas的对象
					canvas.height = viewport.height; //定义canvas高和宽
					canvas.width = viewport.width;
					let renderContext = {
						canvasContext: context,
						viewport: viewport
					};
					await page.render(renderContext)

					canvas.className = 'canvas' //给canvas节点定义一个class名,这里我取名为canvas
					pdfList.appendChild(canvas) //插入到pdfList节点的最后
				}
			}
	    },
	},
}

</script>
<style scoped>

</style>




















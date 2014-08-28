/*
 VideoAnalyzer 1.0
 25-08-2014
 Copyright by MyTrainr
 */

var VideoAnalyzer = {
	
	// variables
	currentTool: 0,	timeout: false, currentWidth: 0, currentHeight: 0, speed: 1,
	main: $("#main"),drawFrame: $("#drawFrame"),videoFrame: $("#videoFrame"),video: $("#video"),tools: $("#tools"), controls: $("#controls"),
	
	// contexts
	drawCtx: drawFrame.getContext('2d'), videoCtx: videoFrame.getContext('2d'), 
	
	// default config
	config: {
		width: 1280,
		height: 760,
		toolset: ['line','arrowFixed','arrowFree']			
	}, 	
	
	// initialize
	init: function(config){
		$.extend(this.config,config);
		this.currentWidth =  this.config.width;  
		this.currentHeight = this.config.height;	
		this.crossOrigin();			
		this.setSizes();
		this.checkVideoState();
		this.showTools();					
		this.scaleSizes();
		this.controlBtns();	
		this.video.get(0).pause();
		this.video.get(0).playbackRate = this.speed;
	},	
	
	// check the state of the video and draw when playing
	checkVideoState: function(){
		VideoAnalyzer.drawVideo(); 	
		this.timeout = setTimeout(VideoAnalyzer.checkVideoState,20);			
	},
	
	drawVideo: function(){
		if(VideoAnalyzer['video'].get(0).paused || VideoAnalyzer['video'].get(0).ended){
			return false;
			clearTimeout(this.timeout);
		}
		vf = document.getElementById('videoFrame');
		vf.width = VideoAnalyzer.config.width;
		vf.height = VideoAnalyzer.config.height;
		this.videoCtx.drawImage(document.getElementById('video'),0,0,VideoAnalyzer.config.width,VideoAnalyzer.config.height);	
	},
		
	// clear entire drawingCanvas
	clear: function(){
		drawFrame.width = drawFrame.width;		
	},
	
	// set the tools
	showTools: function(){
		// create ul
		$("<ul></ul>",{
  				id: "tools",
  				class: "tools"
  		}).appendTo('#tools');	
  		// li's
		$.each(this.config.toolset,function( key, value ) {
  			$("<li></li>",{
  				'data-id': key
  			}).appendTo('.tools')
  				.html('<img src="img/tools/'+value+'.png" />')
  				.on('click',function(event){
  					this.currentTool = $(this).attr('data-id');				
  				});
		})	
	},
	
	crossOrigin: function(){
		this.drawFrame.crossOrigin = 'anonymous';		
	},
	
	// set the basic size
	setSizes: function(){
		this.main
			.width(this.currentWidth)
			.height(this.currentHeight);
		this.controls
			.css('top',this.currentHeight);
		this.tools
			.css('top',this.currentHeight);	
	},
	
	// scale when screen resizes
	scaleSizes: function(){
		$(window).resize(function(){
			// window size calculation for retaining scale
			aspectRatio = VideoAnalyzer.config.width/VideoAnalyzer.config.height;
			if(window.innerWidth < VideoAnalyzer.config.width)
				width = window.innerWidth;		
			else
				width = VideoAnalyzer.config.width;
			height = width/aspectRatio;	
						
			VideoAnalyzer.main
				.width(width)
				.height(height);
			// set new sizes
			VideoAnalyzer.currentWidth = width;
			VideoAnalyzer.currentHeight = height;
			VideoAnalyzer.setSizes();
		});
	},
	
	controlBtns: function(){
		// play and pause
		$("#playPause").on('click',function(){
			if(VideoAnalyzer['video'].get(0).paused || VideoAnalyzer['video'].get(0).ended)
				VideoAnalyzer.video.get(0).play();			
			else
				VideoAnalyzer.video.get(0).pause();			
		})
		// next and prev
		$("#next").on('click', function(){
			VideoAnalyzer.clear();
			VideoAnalyzer.video.get(0).currentTime = (VideoAnalyzer.video.get(0).currentTime+1);			
			VideoAnalyzer.video.get(0).pause();			
		})
		$("#prev").on('click', function(){
			VideoAnalyzer.clear();
			VideoAnalyzer.video.get(0).currentTime = (VideoAnalyzer.video.get(0).currentTime-1);	
			VideoAnalyzer.video.get(0).pause();			
		})
		
		
	}
			
		
}

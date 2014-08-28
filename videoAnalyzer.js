/*
 VideoAnalyzer 1.0
 25-08-2014
 Copyright by MyTrainr
 */

var VideoAnalyzer = {
	
	// variables
	main: $("#main"),drawFrame: $("#drawFrame"),videoFrame: $("#videoFrame"),video: $("#video"),tools: $("#tools"), controls: $("#controls"),
	
	// contexts
	drawCtx: drawFrame.getContext('2d'), videoCtx: videoFrame.getContext('2d'), 
	
	// default config
	config: {
		width: 1280,
		height: 760,
		toolset: ['line','arrowFixed','arrowFree']				
	}, 
	
	currentTool: 0,
	timeout: false,
	
	// initialize
	init: function(config){
		$.extend(this.config,config);
		this.crossOrigin();			
		this.setSizes();
		this.checkVideoState();
		this.showTools();					
		this.scaleSizes();
		this.controlBtns();	
		VideoAnalyzer.video.get(0).pause();
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
			.width(this.config.width)
			.height(this.config.height);
		this.controls
			.css('top',this.config.height);
		this.tools
			.css('top',this.config.height);	
	},
	
	// scale when screen resizes
	scaleSizes: function(){
		$(window).resize(function(){
			// window size calculation for retaining scale
			aspectRatio = VideoAnalyzer.config.width/VideoAnalyzer.config.height;
			windowWidth = window.innerWidth;
			height = VideoAnalyzer.config.height;
			width = height*aspectRatio;	
						
			VideoAnalyzer.main
				.width(width)
				.height(height);
		});
	},
	
	controlBtns: function(){
		
		$("#playPause").on('click',function(){
			if(VideoAnalyzer['video'].get(0).paused || VideoAnalyzer['video'].get(0).ended)
				VideoAnalyzer.video.get(0).play();			
			else
				VideoAnalyzer.video.get(0).pause();			
		})
		
		
	}
			
		
}

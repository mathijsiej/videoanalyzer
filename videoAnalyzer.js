/*
 VideoAnalyzer 1.0
 25-08-2014
 Copyright by MyTrainr
 */

var VideoAnalyzer = {
	
	// variables
	currentTool: 0,	timeout: false, currentWidth: 0, currentHeight: 0, speed: 1,
	main: $("#main"),drawFrame: $("#drawFrame"),videoFrame: $("#videoFrame"),video: $("#video"),tools: $("#tools"), controls: $("#controls"), loadingbar: $("#loadingbar"),
	speedIndicator: $("#speedIndicator"),
	
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
		this.loader();		
	},	
	
	loader: function(){
		// loader
		var videoDuration = $("video").prop('duration');
		if ($("video").prop('readyState')) {
        	var buffered = $("video").prop("buffered").end(0);
        	var percent = 100 * buffered / videoDuration;
        	percent = Math.round((percent*10)/10);
        	VideoAnalyzer.loadingbar.animate({
        		width: (VideoAnalyzer.config.width/100)*percent+'px'
        	},1,"linear");
        	VideoAnalyzer.loadingbar.html(percent+'%');
	        if (percent > 95) {	        		        	
	        	clearTimeout(VideoAnalyzer.timeout); 
				VideoAnalyzer.startup();				 
	        }        
       }
       
       this.timeout = setTimeout(VideoAnalyzer.loader,1);
		
	},
	
	startup: function(){
		VideoAnalyzer.currentWidth =  VideoAnalyzer.config.width;  
		VideoAnalyzer.currentHeight = VideoAnalyzer.config.height;	
		VideoAnalyzer.crossOrigin();			
		VideoAnalyzer.setSizes();
		VideoAnalyzer.checkVideoState();
		VideoAnalyzer.showTools();					
		VideoAnalyzer.scaleSizes();
		VideoAnalyzer.controlBtns();	
		VideoAnalyzer.video.get(0).pause();
		VideoAnalyzer.video.get(0).playbackRate = VideoAnalyzer.speed; 
		VideoAnalyzer.video.get(0).currentTime = 0;		 
		VideoAnalyzer.loadingbar.hide();
		VideoAnalyzer.main.show(); 
		
	},
	
	// check the state of the video and draw when playing
	checkVideoState: function(){
		if(VideoAnalyzer['video'].get(0).paused || VideoAnalyzer['video'].get(0).ended)
			clearTimeout(this.timeout);
		else
			VideoAnalyzer.drawVideo();			
		this.timeout = setTimeout(VideoAnalyzer.checkVideoState,20);		
	},
	
	drawVideo: function(){		
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
			if(VideoAnalyzer['video'].get(0).paused || VideoAnalyzer['video'].get(0).ended){
				VideoAnalyzer.video.get(0).play();	
				$(this).html('pause');		
			}
			else{
				VideoAnalyzer.video.get(0).pause();
				$(this).html('play');
			}			
		})
		// next and prev
		$("#next").on('click', function(){
			VideoAnalyzer.video.get(0).currentTime = (VideoAnalyzer.video.get(0).currentTime+1);			
			VideoAnalyzer.video.get(0).pause();			
		})
		$("#prev").on('click', function(){
			VideoAnalyzer.video.get(0).currentTime = (VideoAnalyzer.video.get(0).currentTime-1);	
			VideoAnalyzer.video.get(0).pause();			
		})
		
		// speedup and speeddown
		$("#speedUp").on('click', function(){			
			VideoAnalyzer.video.get(0).playbackRate = (VideoAnalyzer.video.get(0).playbackRate+0.1);
			var rounded = Math.round( VideoAnalyzer.video.get(0).playbackRate * 10 ) / 10;
        	VideoAnalyzer.speedIndicator.html(rounded);			
		})
		$("#speedDown").on('click', function(){
			VideoAnalyzer.video.get(0).playbackRate = (VideoAnalyzer.video.get(0).playbackRate-0.1);
			var rounded = Math.round( VideoAnalyzer.video.get(0).playbackRate * 10 ) / 10;
        	VideoAnalyzer.speedIndicator.html(rounded);	
		})		
		
	}	
}

alert('testing GIT');

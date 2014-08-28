Video Analyzer trough javascript by Mathijs Jansen

HTML markup

<div id="main">
		<!-- Drawings -->	
			<canvas id="drawFrame"></canvas>
			<canvas id="videoFrame"></canvas>
		<!-- End drawings -->
		<!-- Video -->
		<video id="video" preload="auto" autoplay muted controls>
				<source src="http://onlinesportadviseur.s3-us-west-2.amazonaws.com/videos/Mijn%20film.mp4" type="video/mp4">
				Your browser does not support the video tag.
		</video>	
		<!-- end video -->	
		
		<div id="controls">
			<span id="playPause">Play</span>
		</div>
		
		<!-- tools -->
		<div id="tools"></div>
		<!-- end tools -->
</div>

JS markup

	(function(){			
		VideoAnalyzer.init({
			width: 1280,
			height:	720,
			toolset: ['line','angle']
		});		
	})();


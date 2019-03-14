<div class="col-md-4 col-sm-12 portfolio-item">
	<a href="#modal<?php echo str_replace(' ', '', $project['name']); ?>" class="portfolio-link" data-toggle="modal">
		<div class="portfolio-hover">
			<div class="portfolio-hover-content">
				<i class="fa fa-plus fa-3x"></i>
			</div>
		</div>
		<img src="<?php echo $project['image_url']; ?>" class="img-responsive" alt="<?php echo $project['name']; ?> image">
	</a>
	<div class="portfolio-caption">
		<h4 class="truncate" title="<?php echo $project['name']; ?>"><?php echo $project['name']; ?></h4>
		<p class="text-muted"><?php echo $project['project_type']; ?><?php if($project['link_url'] != null){ echo '- <a href="' . $project['link'] . '" target="_blank">View</a>';} ?><br><?php echo $project['reach']; ?></p>
	</div>
</div>

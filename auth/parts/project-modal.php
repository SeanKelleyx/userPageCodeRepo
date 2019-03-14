<div class="portfolio-modal modal fade" id="modal<?php echo str_replace(' ', '', $project['name']); ?>" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="close-modal" data-dismiss="modal">
				<div class="lr">
					<div class="rl">
					</div>
				</div>
			</div>
			<div class="container">
				<div class="row">
					<div class="col-lg-8 col-lg-offset-2">
						<div class="modal-body">
							<h2><?php echo $project['name']; ?></h2>
							<p class="item-intro text-muted"><?php echo $project['project_type']; ?><?php if($project['link_url'] != null){ echo '- <a href="' . $project['link'] . '" target="_blank">View</a>';} ?></p>
							<img class="img-responsive img-centered" src="<?php echo $project['image_url']; ?>" alt="<?php echo $project['name']; ?> image">
							<p><?php echo $project['description']; ?> <b><?php echo $project['technologies']; ?></b></p>
							<ul class="list-inline">
								<li>Client: <?php echo $project['client']; ?></li>
								<li>Category: <?php echo $project['project_type']; ?></li>
								<li>Usage: <?php echo $project['reach']; ?></li>
							</ul>
							<button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-times"></i> Close Project</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<?php
/**
 * BYU theme page to generate the markup for a single page.
 */
?>


<header id="main-header" role="banner">
	<div id="header-top" class="wrapper">
		<h1>
			<a href="<?php print $front_page; ?>" id="site-logo" title="<?php print t('Home'); ?>" rel="home"></a>
			<a href="<?php print $front_page; ?>" id="site-name" title="<?php print t('Home'); ?>" rel="home">
				<acronym class="name cid" title="Creativity Innovation Design">CID</acronym>
				<span class="name creativity">Creativity</span>
				<span class="name innovation">Innovation<span class="amp">&amp;</span></span>
				<span class="name design">Design</span>
				<acronym class="name byu" title="Brigham Young University">BYU</acronym>
			</a>
		</h1>
	</div>


	<div class="nav-container">
			<nav id="primary-nav" role="navigation">	
				<?php
					if ($main_menu):
						if (module_exists('byu_megamenu')) {
							print _renderMainMenu();
						} else {
							$menu = menu_tree(variable_get('menu_main_links_source', 'main-menu'));
							print drupal_render($menu);	
						}
					endif; 
				?>
			</nav>
			
			<nav id="secondary-nav" role="navigation">
				<?php if ($secondary_menu):
					$menu = menu_tree(variable_get('menu_secondary_links_source', 'secondary-menu'));
					print drupal_render($menu);	
				endif; ?>
			</nav>
	</div>


</header>
	


<?php 
// Render the sidebars to see if there's anything in them.
$sidebar_left  = render($page['sidebar_left']);
$sidebar_right = render($page['sidebar_right']);
$feature       = render($page['feature']);
?>





<div id="content" class="wrapper clearfix template-front<?php print (drupal_is_front_page() ? ' front-page' : '') ?>" role="main">
	<?php print render($page['highlighted']); ?>

	<?php if ( $title && !drupal_is_front_page()) : ?>
	  <h1 class="title" id="page-title"><?php print $title; ?></h1>
	<?php endif; ?>

	<?php print $messages; ?>
	<?php print render($tabs); ?>
	<?php print render($page['help']); ?>
	<?php if ($action_links): ?>
		<ul class="action-links"><?php print render($action_links); ?></ul>
	<?php endif; ?>
	
	 <?php if ($sidebar_left): ?>
		<aside class="sidebar">
			<?php print $sidebar_left; ?>
		</aside><!-- /.sidebars -->
    <?php endif; ?>

	<?php if ($feature): ?>
		<div class="feature">
			<?php  print $feature; ?>
		</div>
	<?php endif; ?>
	  
	<?php if ($sidebar_right): ?>
		<aside class="sidebar">
			<?php print $sidebar_right; ?>
		</aside><!-- /.sidebars -->
	<?php endif; ?>
      
</div>




<footer id="page-footer" role="contentinfo">
		<div id="footer-links">
			<div class="wrapper">
				<?php print render($page['footer']); ?>
			</div>
		</div>

		<div id="footer-bottom">
			<div class="wrapper clearfix">
			<?php 
			if (!render($page['copyright'])): //If there is no specific content in the copyright area, display default ?> 
				
			<?php else: 
				print render($page['copyright']);
			endif; ?>
			</div>
		</div>
	
</footer>
<?php print render($page['bottom']); ?>
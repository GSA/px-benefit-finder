<?php
namespace Drupal\usagov_bears_block\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'UsagovBearsBlock' block.
 *
 * @Block(
 *  id = "usagov_bears_block",
 *  admin_label = @Translation("usagov bears block"),
 * )
 */
class UsagovBearsBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $build = [];
    $build['usagov_bears_block'] = [
      '#markup' => '<div id="usagov-bears-app"></div>',
    ];
    return $build;
  }
}

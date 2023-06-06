<?php
namespace Drupal\usagov_bears_content\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\node;

/**
 * Import life event.
 *
 * Class ImportLifeEventController
 * @package Drupal\usagov_bears_content\Controller
 */
class ImportLifeEventController extends ControllerBase {

  /**
   * Import life event.
   *
   * @return string[]
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  public function import_life_event() {
    $life_event = [
      'title' => "Death of a loved one",
      'summary' => "If you have lost a loved one, you may qualify for help,
        including assistance with burial or funeral costs, financial support, and more.",
    ];
    $newLifeEventNode = $this->createLifeEventNode($life_event);
    $life_event = [
      'title' => "Retirement",
      'summary' => "Find out what financial, health care, and other benefits may be available
        as you enter this next phase of your life.",
    ];
    $newLifeEventNode = $this->createLifeEventNode($life_event);
    $life_event = [
      'title' => "Disability",
      'summary' => "Whether you are newly disabled or have a lifelong challenge, assistance
        may be available, including financial help.,"
    ];
    $newLifeEventNode = $this->createLifeEventNode($life_event);
    $element = [
      '#markup' => '<p>' . t('Import life event.') . '</p>',
    ];
    return $element;
  }

  /**
   * Create life event.
   *
   * @param $life_event
   * @return bool
   * @throws \Drupal\Core\Entity\EntityStorageException
   */
  protected function createLifeEventNode($life_event) {
    $new_life_event = Node::create(['type' => 'life_event']);
    $new_life_event->set('title', $life_event['title']);
    $new_life_event->set('field_summary', [
      'value' => $life_event['summary'],
    ]);
    $new_life_event->enforceIsNew();
    $new_life_event->status = 1;
    $new_life_event->save();
    return true;
  }

}

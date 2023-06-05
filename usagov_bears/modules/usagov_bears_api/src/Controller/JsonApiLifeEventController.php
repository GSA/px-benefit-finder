<?php
namespace Drupal\usagov_bears_api\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class JsonApiLifeEventController
 * @package Drupal\usagov_bears_api\Controller
 */
class JsonApiLifeEventController {

  /**
   * @return JsonResponse
   */
  public function index($name) {
    return new JsonResponse([ 'data' => $this->getData($name), 'method' => 'GET', 'status'=> 200]);
  }

  /**
   * @param $lifeEvent
   * @return array
   */
  public function getData($name) {
    $result=[];
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'life_event')
      ->condition('title', $name);
    $nodes_ids = $query->execute();
    if ($nodes_ids) {
      foreach ($nodes_ids as $node_id) {
        $node = \Drupal\node\Entity\Node::load($node_id);
        $result[] = [
          "id" => $node->id(),
          "title" => $node->getTitle(),
        ];
      }
    }
    return $result;
  }
}

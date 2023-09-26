<?php

namespace Drupal\usagov_bears_api\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Drupal\node\Entity\node;
use Drupal\Core\File\FileSystemInterface;
use Drupal\file\FileInterface;

/**
 * Class LifeEventController
 * @package Drupal\usagov_bears_api\Controller
 */
class LifeEventController {

  /**
   * The entity type manager service.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The file system service.

   * @var \Drupal\Core\File\FileSystemInterface
   */
  protected $fileSystem;

  /**
   * Thee file repository service.
   *
   * @var \Drupal\file\FileRepositoryInterface
   */
  protected $fileRepository;

  /**
   * The file url generator service.
   *
   * @var \Drupal\Core\File\FileUrlGeneratorInterface
   */
  protected $fileUrlGenerator;

  /**
   * {@inheritdoc}
   */
  public function __construct()
  {
    $this->entityTypeManager = \Drupal::service('entity_type.manager');
    $this->fileSystem = \Drupal::service('file_system');
    $this->fileRepository = \Drupal::service('file.repository');
    $this->fileUrlGenerator = \Drupal::service('file_url_generator');
  }

  /**
   * Saves JSON data file.
   *
   * @param $id
   * @return JsonResponse
   *  The response.
   */
  public function saveJsonData($id) {
    // Prepare directory.
    $directory = "public://bears/api/life_event";
    $this->fileSystem->prepareDirectory($directory, FileSystemInterface:: CREATE_DIRECTORY | FileSystemInterface::MODIFY_PERMISSIONS);

    // Get JSON data.
    $data = json_encode([
        'data' => $this->getData($id),
        'method' => 'GET',
        'status' => 200
      ]
    );

    // Write JSON data file.
    $filename = "$directory/$id.json";
    $file = $this->fileRepository->writeData($data, $filename, FileSystemInterface::EXISTS_REPLACE);

    $fileUrlString = $this->fileUrlGenerator->generate($filename)->toString();
    return new JsonResponse([
        'data' => "Saved JSON data to " . $fileUrlString,
        'method' => 'GET',
        'status' => 200
      ]
    );
  }

  /**
   * Gets Json Data of given life event.
   * @param $id
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   The response.
   */
  public function getJsonData($id) {
    return new JsonResponse([
        'data' => $this->getData($id),
        'method' => 'GET',
        'status' => 200
      ]
    );
  }

  /**
   * Gets data of life event form and benefits of given life event.
   * @param $id
   * @return mixed
   *  The JSON encoded data.
   */
  public function getData($id) {
    $life_event_form = [];
    $benefits = [];
    $result = [];

    // Get life event form node and node ID of given life event.
    $life_event_form_node = $this->getLifeEventForm($id);
    $life_event_form_node_id = $life_event_form_node->id();

    // Build life event form.
    $life_event_form = [
      "id" => $life_event_form_node->get('field_b_id')->value,
      "timeEstimate" => $life_event_form_node->get('field_b_time_estimate')->value ?? "",
      "titlePrefix" => $life_event_form_node->get('field_b_title_prefix')->value ?? "",
      "title" => $life_event_form_node->get('title')->value ?? "",
      "summary" => $life_event_form_node->get('field_b_summary')->value ?? ""
    ];

    // Get Sections of Eligibility Criteria.
    $sections = $life_event_form_node->get('field_b_sections_elg_criteria')->referencedEntities();

    // Build sections of eligibility criteria.
    $life_event_form_sections = [];

    foreach ($sections as $section) {
      $life_event_form_section = [
        "heading" => $section->get('field_b_heading')->value ?? "",
        "description" => $section->get('field_b_description')->value ?? ""
      ];

      // Get criterias of a section.
      $criterias = $section->get('field_b_criterias')->referencedEntities();

      // Build criteria fieldsets.
      $criteria_fieldsets = [];
      foreach ($criterias as $criteria) {
        if ($criteria->type->target_id == "b_levent_elg_criteria") {
          $criteria_fieldset = $this->buildCriteriaFieldset($criteria);
        } else if ($criteria->type->target_id == "b_levent_elg_criteria_group") {
          $criteria_fieldset = $this->buildCriteriaGroupFieldset($criteria);
        }
        $criteria_fieldsets[]['fieldset'] = $criteria_fieldset;
      }

      $life_event_form_section['fieldsets'] = $criteria_fieldsets;
      $life_event_form_sections[]['section'] = $life_event_form_section;
    }

    $life_event_form['sectionsEligibilityCriteria'] = $life_event_form_sections;

    // Get benefits of given life event form.
    $benefit_nodes = $this->getBenefits($life_event_form_node_id);

    // Build benefits.
    foreach ($benefit_nodes as $benefit_node) {
      $benefits[]["benefit"] = $this->buildBenefit($benefit_node);
    }

    // Encode JSON data.
    $result = [
      "lifeEventForm" => $life_event_form,
      "benefits" => $benefits
    ];
    $json = json_encode($result, JSON_PRETTY_PRINT);
    print_r("<p>JSON Data<pre>");
    print_r($json);
    print_r("</pre>");

    return $result;
  }

  /**
   * Gets life event form of given ID.
   * @param $id
   * @return \Drupal\node\NodeInterface
   *   The life event form node.
   */
  public function getLifeEventForm($id) {
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'bears_life_event_form')
      ->condition('field_b_id', $id)
      ->range(0, 1);
    $node_id = current($query->execute());
    $service = $this->entityTypeManager->getStorage('node');
    $node = $service->load($node_id);
    return $node;
  }

  /**
   * Gets benefits of given life event form.
   * @param $nid
   * @return \Drupal\node\NodeInterface[]
   *   The benefit nodes.
   */
  public function getBenefits($nid) {
    $query = \Drupal::entityQuery('node')
      ->condition('type', 'bears_benefit')
      ->condition('field_b_life_event_forms', $nid, 'CONTAINS');
    $nids = $query->execute();
    $nodes = Node::loadMultiple($nids);
    return $nodes;
  }

  /**
   * Builds criteria group fieldset.
   * @param $criteria
   * @return array
   */
  public function buildCriteriaGroupFieldset($criteria) {
    $criteria_group_fieldset = [];

    // Build criteria group fieldset.
    $criteria_group_fieldset = [
      "heading" => $criteria->get("field_b_heading")->value ?? "",
      "description" => $criteria->field_b_description->value ?? ""
    ];

    // Get criterias multi paragraphs.
    $criterias = $criteria->get('field_b_criterias')->referencedEntities();

    // Build criteria group criteria fieldsets.
    $group_fieldsets = [];
    foreach ($criterias as $criteria) {
      $criteria_fieldset = $this->buildCriteriaFieldset($criteria);
      $group_fieldsets[]['fieldset'] = $criteria_fieldset;
    }

    $criteria_group_fieldset["fieldsets"] = $group_fieldsets;

    return $criteria_group_fieldset;
  }

  /**
   * Builds criteria fieldset.
   * @param $criteria
   * @return array
   */
  public function buildCriteriaFieldset($criteria)
  {
    $criteria_fieldset = [];

    // Build criteria fieldset.
    $criteria_fieldset = [
      "criteriaKey" => current($criteria->get('field_b_criteria_key')->referencedEntities())->get('field_b_id')->value,
      "legend" => $criteria->get('field_b_legend')->value ?? "",
      "required" => $criteria->get('field_b_required')->value ? "TRUE":"FALSE",
      "hint" => $criteria->get('field_b_hint')->value ?? ""
    ];

    // Get criteria node.
    $criteria_node = current($criteria->get('field_b_criteria_key')->referencedEntities());

    // Build inputCriteria.
    $inputCriteria = [
      "id" => $criteria_node->get('field_b_id')->value,
      "type" => $criteria_node->get('field_b_type')->value,
      "name" => $criteria_node->get('field_b_name')->value ?? "",
      "label" => $criteria_node->get('field_b_label')->value ?? "",
      "hasChild" => $criteria_node->get('field_b_has_child')->value ? "TRUE":"FALSE",
      "childDependencyOption" => $criteria_node->get('field_b_child_dependency_option')->value ?? ""
    ];

    $criteria_values = [];

    if ($criteria_node->get('field_b_type')->value == 'date' || $criteria_node->get('field_b_type')->value == "Date") {
      $criteria_values[] = array(
        "default" => "",
        "value" => (object)[]
      );
    }

    $b_values = $criteria_node->get('field_b_values')->getValue();
    foreach ($b_values as $b_value) {
      $criteria_values[] = array(
        "option" => $b_value["value"],
        "value" => $b_value["value"]
      );
    }
    $inputCriteria["values"] = $criteria_values;

    $criteria_fieldset["inputs"][]["inputCriteria"] = $inputCriteria;

    // Get criterias fieldsets multi paragraphs
    $criterias_1 = $criteria->get('field_b_children')->referencedEntities();
    if (empty($criterias_1)) {
      $criteria_fieldset["children"] = [];
    }
    else {
      foreach ($criterias_1 as $criteria_1) {
        if ($criteria_1->type->target_id == "b_levent_elg_criteria") {
          $criteria_fieldset_1 = $this->buildCriteriaFieldset($criteria_1);
        } else if ($criteria_1->type->target_id == "b_levent_elg_criteria_group") {
          $criteria_fieldset_1 = $this->buildCriteriaGroupFieldset($criteria_1);
        }
        $criteria_fieldset["children"][]["fieldsets"][]['fieldset'] = $criteria_fieldset_1;
      }
    }

    return $criteria_fieldset;
  }

  /**
   * Builds benefit data of given benefit node.
   * @param $node
   * @return array
   */
  public function buildBenefit($node) {
    $benefit = [];

    // Build benefit.
    $benefit = [
      "title" => $node->get('title')->value,
      "summary" => $node->get('field_b_summary')->value ?? "",
      "SourceLink" => $node->get('field_b_source_link')->value ?? "",
      "SourceIsEnglish" => $node->get('field_b_source_is_english')->value ? "TRUE": "FALSE"
    ];

    // Build agency.
    $agency = current($node->get('field_b_agency')->referencedEntities());
    $benefit["agency"] = [
      "title" => $agency->get('title')->value,
      "summary" => $agency->get('field_b_summary')->value ?? "",
      "lede" => $agency->get('field_b_lede')->value ?? ""
    ];

    // Build tags.
    $tags = $node->get('field_b_tags')->referencedEntities();
    foreach ($tags as $tag) {
      $benefit["tags"][] = $tag->get('name')->value;
    }

    // Build life event.
    $lifeEvents = $node->get('field_b_life_events')->getValue();
    foreach ($lifeEvents as $lifeEvent) {
      $service = $this->entityTypeManager->getStorage('node');
      $node1 = $service->load($lifeEvent['target_id']);
      $benefit['lifeEvents'][] = $node1->get('title')->value; // death-of-a-loved-one no Death of a loved one
    }

    // Build eligibilities.
    $benefit_eligibilitys = [];
    $eligibilities = $node->get('field_b_eligibility')->referencedEntities();
    foreach ($eligibilities as $eligibility) {
      $benefit_eligibility = [];

      $criteria = current($eligibility->get('field_b_criteria_key')->referencedEntities());
      $ckey = $criteria->get('field_b_criteria_key')->value;

      $benefit_eligibility['criteriaKey'] = $ckey;
      $benefit_eligibility['label'] = $eligibility->get('field_b_label')->value ?? "";

      $acceptableValues = $eligibility->get('field_b_acceptable_values')->getValue();
      foreach ($acceptableValues as $key => $acceptableValue) {
        $benefit_eligibility['acceptableValues'][] = $acceptableValue['value'];
      }

      $benefit_eligibilitys[] = $benefit_eligibility;
    }

    $benefit['eligibility'] = $benefit_eligibilitys;

    return $benefit;
  }
}

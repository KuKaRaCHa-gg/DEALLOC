<?php
class HomeController {
    public function index() {
        $this->loadView('home');
    }

    public function loadView($viewName) {
        require_once "../views/{$viewName}.php";
    }
}
?>

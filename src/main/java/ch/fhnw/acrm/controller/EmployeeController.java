package ch.fhnw.acrm.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(path = "/employee")
public class EmployeeController {

    @GetMapping
    public String getEmployeeView() { return "acrm/emp_profil.html"; }

    @GetMapping("/create")
    public String getEmployeeCreateView(){ return "../acrm/employeeCreate.html"; }

    @GetMapping("/edit")
    public String getEmployeeEditView(){ return "../acrm/employeeEdit.html"; }
}

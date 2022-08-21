package com.furama.controller;

import com.furama.model.customer.Customer;
import com.furama.model.employee.Employee;
import com.furama.service.employee.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    private IEmployeeService employeeService;
    @Autowired
    private IPositionService positionService;
    @Autowired
    private IDivisionService divisionService;
    @Autowired
    private IEducationDegreeService educationDegreeService;
    @Autowired
    private IUserService userService;

    @GetMapping("")
    public String showList(@RequestParam(name = "page", defaultValue = "0") int page, Model model) {
        Sort sort = Sort.by("employeeName").ascending();
        model.addAttribute("employeeList", employeeService.findAll(PageRequest.of(page, 7, sort)));
        return "employee/list";
    }

    @GetMapping("/create")
    public String showCreationForm(Model model){
        model.addAttribute("positionList", positionService.findAll());
        model.addAttribute("divisionList", divisionService.findAll());
        model.addAttribute("educationDegreeList", educationDegreeService.findAll());
        model.addAttribute("userList", userService.findAll());
        model.addAttribute("employee", new Employee());
        return "employee/create";
    }

    @PostMapping("/save")
    public String save(Employee employee, RedirectAttributes redirectAttributes){
        employeeService.save(employee);
        redirectAttributes.addFlashAttribute("msg", "Employee created successfully!!");
        return "redirect:/employee";
    }

    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable Integer id, Model model){
        model.addAttribute("employee", employeeService.findById(id));
        model.addAttribute("positionList", positionService.findAll());
        model.addAttribute("divisionList", divisionService.findAll());
        model.addAttribute("educationDegreeList", educationDegreeService.findAll());
        model.addAttribute("userList", userService.findAll());
        return "employee/edit";
    }

    @PostMapping("/update")
    public String update(Employee employee, RedirectAttributes redirectAttributes){
        employeeService.update(employee);
        redirectAttributes.addFlashAttribute("msg", "Employee edited successfully!!");
        return "redirect:/employee";
    }

    @GetMapping("/delete")
    public String delete(Integer employeeId, RedirectAttributes redirectAttributes){
        Optional<Employee> employee = employeeService.findById(employeeId);
        employeeService.remove(employee.get());
        redirectAttributes.addFlashAttribute("msg", "Employee deleted successfully!!");
        return "redirect:/employee";
    }
}

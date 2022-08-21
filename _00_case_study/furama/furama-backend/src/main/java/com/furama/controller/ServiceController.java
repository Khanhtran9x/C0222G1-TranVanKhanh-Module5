package com.furama.controller;

import com.furama.model.employee.Employee;
import com.furama.model.service.Service;
import com.furama.service.service.IRentTypeService;
import com.furama.service.service.IServiceService;
import com.furama.service.service.IServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
@RequestMapping("/service")
public class ServiceController {
    @Autowired
    private IServiceService serviceService;
    @Autowired
    private IServiceTypeService serviceTypeService;
    @Autowired
    private IRentTypeService rentTypeService;

    @GetMapping("")
    public String showList(@RequestParam(name = "page", defaultValue = "0") int page, Model model) {
        Sort sort = Sort.by("serviceCode").ascending();
        model.addAttribute("serviceList", serviceService.findAll(PageRequest.of(page, 5, sort)));
        model.addAttribute("service", new Service());
        model.addAttribute("serviceTypeList", serviceTypeService.findAll());
        model.addAttribute("rentTypeList", rentTypeService.findAll());
        return "service/list";
    }

    @GetMapping("/create")
    public String showCreationForm(Model model){
        model.addAttribute("serviceTypeList", serviceTypeService.findAll());
        model.addAttribute("rentTypeList", rentTypeService.findAll());
        model.addAttribute("service", new Service());
        return "service/create";
    }

    @PostMapping("/save")
    public String save(Service service, RedirectAttributes redirectAttributes){
        serviceService.save(service);
        redirectAttributes.addFlashAttribute("msg", "Service created successfully!!");
        return "redirect:/service";
    }

    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable Integer id, Model model){
        model.addAttribute("service", serviceService.findById(id));
        model.addAttribute("serviceTypeList", serviceTypeService.findAll());
        model.addAttribute("rentTypeList", rentTypeService.findAll());
        return "service/edit";
    }

    @PostMapping("/update")
    public String update(Service service, RedirectAttributes redirectAttributes){
        serviceService.update(service);
        redirectAttributes.addFlashAttribute("msg", "Service edited successfully!!");
        return "redirect:/service";
    }

    @GetMapping("/delete")
    public String delete(Integer serviceId, RedirectAttributes redirectAttributes){
        Optional<Service> service = serviceService.findById(serviceId);
        serviceService.remove(service.get());
        redirectAttributes.addFlashAttribute("msg", "Service deleted successfully!!");
        return "redirect:/service";
    }
}

package com.furama.controller;

import com.furama.model.customer.Customer;
import com.furama.service.customer.ICustomerService;
import com.furama.service.customer.ICustomerTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private ICustomerTypeService customerTypeService;

    @GetMapping("")
    public String showList(@RequestParam(name = "page", defaultValue = "0") int page, Model model) {
        Sort sort = Sort.by("customerName").ascending();
        model.addAttribute("customerList", customerService.findAll(PageRequest.of(page, 7, sort)));
        return "customer/list";
    }

    @GetMapping("/create")
    public String showCreationForm(Model model){
        model.addAttribute("customerTypeList", customerTypeService.findAll());
        model.addAttribute("customer", new Customer());
        return "customer/create";
    }

    @PostMapping("/save")
    public String save(Customer customer, RedirectAttributes redirectAttributes){
        customerService.save(customer);
        redirectAttributes.addFlashAttribute("msg", "Customer created successfully!!");
        return "redirect:/customer";
    }

    @GetMapping("/{id}/edit")
    public String showEditForm(@PathVariable Integer id, Model model){
        model.addAttribute("customer", customerService.findById(id));
        model.addAttribute("customerTypeList", customerTypeService.findAll());
        return "customer/edit";
    }

    @PostMapping("/update")
    public String update(Customer customer, RedirectAttributes redirectAttributes){
        customerService.update(customer);
        redirectAttributes.addFlashAttribute("msg", "Customer edited successfully!!");
        return "redirect:/customer";
    }

    @GetMapping("/delete")
    public String delete(Integer customerId, RedirectAttributes redirectAttributes){
        Optional<Customer> customer = customerService.findById(customerId);
        customerService.remove(customer.get());
        redirectAttributes.addFlashAttribute("msg", "Customer deleted successfully!!");
        return "redirect:/customer";
    }
}

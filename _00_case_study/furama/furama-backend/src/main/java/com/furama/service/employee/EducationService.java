package com.furama.service.employee;

import com.furama.model.employee.EducationDegree;
import com.furama.repository.employee.IEducationDegreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EducationService implements IEducationDegreeService{
    @Autowired
    private IEducationDegreeRepository educationDegreeRepository;
    @Override
    public List<EducationDegree> findAll() {
        return educationDegreeRepository.findAll();
    }

    @Override
    public void save(EducationDegree educationDegree) {

    }

    @Override
    public Optional<EducationDegree> findById(Integer id) {
        return Optional.empty();
    }
}

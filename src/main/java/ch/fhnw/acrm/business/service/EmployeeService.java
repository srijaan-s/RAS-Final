package ch.fhnw.acrm.business.service;


import ch.fhnw.acrm.data.domain.Employee;
import ch.fhnw.acrm.data.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.util.List;

@Service
@Validated
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private AgentService agentService;

    public Employee editEmployee(@Valid Employee employee) throws Exception {
        if (employee.getId() == null) {
            if (employeeRepository.findByMobile(employee.getMobile()) == null) {
                employee.setAgent(agentService.getCurrentAgent());
                return employeeRepository.save(employee);
            }
            throw new Exception("Mobile number " + employee.getMobile() + " already assigned to a employee.");
        }
        if (employeeRepository.findByMobileAndIdNot(employee.getMobile(), employee.getId()) == null) {
            if (employee.getAgent() == null) {
                employee.setAgent(agentService.getCurrentAgent());
            }
            return employeeRepository.save(employee);
        }
        throw new Exception("Mobile number " + employee.getMobile() + " already assigned to a employee.");
    }

    public void deleteEmployee(Long employeeId)
    {
        employeeRepository.deleteById(employeeId);
    }

    public Employee findEmployeeById(Long employeeId) throws Exception {
        List<Employee> employeeList = employeeRepository.findByIdAndAgentId(employeeId, agentService.getCurrentAgent().getId());
        if(employeeList.isEmpty()){
            throw new Exception("No employee with ID "+employeeId+" found.");
        }
        return employeeList.get(0);
    }

    public List<Employee> findAllEmployees() {
        return employeeRepository.findByAgentId(agentService.getCurrentAgent().getId());
    }

}

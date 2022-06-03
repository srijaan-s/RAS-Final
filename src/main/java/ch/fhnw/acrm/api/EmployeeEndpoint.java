package ch.fhnw.acrm.api;

import ch.fhnw.acrm.business.service.EmployeeService;
import ch.fhnw.acrm.data.domain.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.ConstraintViolationException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class EmployeeEndpoint {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping(path = "/employee", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Employee> postEmployee(@RequestBody Employee employee) {
        try {
            employee = employeeService.editEmployee(employee);
        } catch (ConstraintViolationException e) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, e.getConstraintViolations().iterator().next().getMessage());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, e.getMessage());
        }

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{employeeId}")
                .buildAndExpand(employee.getId()).toUri();

        return ResponseEntity.created(location).body(employee);
    }

    @GetMapping(path = "/employee", produces = "application/json")
    public List<Employee> getEmployees() {
        return employeeService.findAllEmployees();
    }

    @GetMapping(path = "/employee/{employeeId}", produces = "application/json")
    public ResponseEntity<Employee> getEmployee(@PathVariable(value = "employeeId") String employeeId) {
        Employee employee = null;
        try {
            employee = employeeService.findEmployeeById(Long.parseLong(employeeId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
        return ResponseEntity.ok(employee);
    }

    @PutMapping(path = "/employee/{employeeId}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Employee> putEmployee(@RequestBody Employee employee, @PathVariable(value = "employeeId") String employeeId) {
        try {
            employee.setId(Long.parseLong(employeeId));
            employee = employeeService.editEmployee(employee);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, e.getMessage());
        }
        return ResponseEntity.accepted().body(employee);
    }

    @DeleteMapping(path = "/employee/{employeeId}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable(value = "employeeId") String employeeId) {
        try {
            employeeService.deleteEmployee(Long.parseLong(employeeId));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_ACCEPTABLE, e.getMessage());
        }
        return ResponseEntity.accepted().build();
    }
}
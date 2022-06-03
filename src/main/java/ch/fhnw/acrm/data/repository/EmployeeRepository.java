/*
 * Copyright (c) 2020. University of Applied Sciences and Arts Northwestern Switzerland FHNW.
 * All rights reserved.
 */

package ch.fhnw.acrm.data.repository;

import ch.fhnw.acrm.data.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
	Employee findByMobile(String mobile);
	Employee findByMobileAndIdNot(String mobile, Long agentId);
	List<Employee> findByAgentId(Long agentId);
	List<Employee> findByIdAndAgentId(Long customerId, Long agentId);
}
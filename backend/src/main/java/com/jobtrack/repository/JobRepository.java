package com.jobtrack.repository;
import org.springframework.data.jpa.repository.JpaRepository;	

import com.jobtrack.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long>  {
	
}

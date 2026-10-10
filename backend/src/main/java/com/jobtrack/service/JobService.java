package com.jobtrack.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.jobtrack.entity.Job;
import com.jobtrack.repository.JobRepository;

@Service
public class JobService {
private final JobRepository jobRepository;
	
	public JobService(JobRepository jobRepository) {
		this.jobRepository=jobRepository;
	}
     
	public Job createJob(Job job) {
		return jobRepository.save(job);
	}
	
	public List<Job> getAllJobs(){
		return jobRepository.findAll();
	}
	
	public Job getJobById(Long id) {
	    return jobRepository.findById(id)
	    		.orElseThrow(() -> 
	    		new ResponseStatusException(
	    				HttpStatus.NOT_FOUND,
	    				"Job not found"
	    				)
	    		
	    		);
	    
	 
	}
	
	public Job updateJob(Long id, Job updatedJob) {

	    Job existingJob = jobRepository.findById(id)
	            .orElseThrow(() ->
	                new ResponseStatusException(
	                    HttpStatus.NOT_FOUND,
	                    "Job not found"
	                )
	            );

	    existingJob.setCompany(updatedJob.getCompany());
	    existingJob.setRole(updatedJob.getRole());
	    existingJob.setStatus(updatedJob.getStatus());

	    return jobRepository.save(existingJob);
	}
	
	public void deleteJob(Long id) {
	    if(!jobRepository.existsById(id)) {
	    throw new ResponseStatusException(
	    		HttpStatus.NOT_FOUND,
	    		"Job not found"
	    );
	}
	 jobRepository.deleteById(id);   
	
}
}

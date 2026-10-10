package com.jobtrack.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.jobtrack.entity.Job;
import com.jobtrack.service.JobService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class HelloController {
	private final JobService jobService;
	
	public HelloController(JobService jobService) {
		this.jobService=jobService;
		}
	
    @GetMapping("/api/hello")
    public HelloResponse hello() {

        HelloResponse response =
                new HelloResponse("Welcome to JobTrack");

        return response;
    }
    
     
    
    @PostMapping("/api/jobs")
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job job) {
        Job savedJob= jobService.createJob(job);
        return ResponseEntity.status(201).body(savedJob);
    }
    
    @GetMapping("/api/jobs")
    	public List<Job> getAllJobs(){
    		return jobService.getAllJobs();
    	}
    
    @GetMapping("/api/jobs/{id}")
    public Job getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }
    
    @PutMapping("/api/jobs/{id}")
    public Job updateJob(@PathVariable Long id, @Valid @RequestBody Job job) {
    		return jobService.updateJob(id,job);
    	
    }
    
    @DeleteMapping("/api/jobs/{id}")
    public void deleteJob(@PathVariable Long id) {
    		 jobService.deleteJob(id);
    }
    
}

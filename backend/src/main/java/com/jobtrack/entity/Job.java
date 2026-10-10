package com.jobtrack.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
	
@Entity
public class Job {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "Company name cannot be empty")
	private String company;
	@NotBlank(message = "Job role cannot be empty")
	private String role;
	@NotBlank(message = "Status cannot be empty")
	@Pattern(
	    regexp = "APPLIED|INTERVIEW|SELECTED|REJECTED",
	    message = "Status must be APPLIED, INTERVIEW, SELECTED, or REJECTED"
	)
	private String status;
	 
	 public Job() {
	 }
	 
		 public 	Long getId(){
			 return id;
		 }
		 public void setId(Long id) {
			 this.id=id;
		 }
		 
		 public String getCompany() {
			 return company;
		 }
		 public void setCompany(String company) {
			 this.company=company;
		 }
		 
		 public String getRole() {
			 return role;
		 }
		 public void setRole(String role) {
			 this.role=role;
		 }
		 
		 public String getStatus() {
			 return status;
		 }
		 public void setStatus(String status) {
			 this.status=status;
		 }
	    
}

package com.placement.management.Controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.placement.management.Entity.ApplicationDetails;
import com.placement.management.Entity.JobPost;
import com.placement.management.Entity.StudentDetails;
import com.placement.management.Services.ApplicationDetailsService;
import com.placement.management.Services.JobPostService;
import com.placement.management.Services.StudentDetailsService;
import com.placement.management.helper.FileUploadHelper;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/applications")
public class ApplicationDetailsController {

    @Autowired
    private ApplicationDetailsService service;

    @Autowired
    private FileUploadHelper fUploadHelper;

    @Autowired
    private StudentDetailsService studentDetailsService;

    @Autowired
    private JobPostService jobPostService;

    @GetMapping
    public List<ApplicationDetails> getAllApplications() {
        return service.getAllAppalication();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDetails> getApplicationById(@PathVariable Long id) {
        Optional<ApplicationDetails> applicationDetails = service.getApplicationById(id);
        return applicationDetails.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ApplicationDetails createApplication(
            @RequestParam("studentId") Integer studentId,
            @RequestParam("jobPostId") Long jobPostId,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("contact") String contact,
            @RequestParam("resume") MultipartFile resume,
            @RequestParam("status") Character status) {

        Optional<StudentDetails> studentOptional = studentDetailsService.getStudentById(studentId);
        Optional<JobPost> jobPostOptional = Optional.of(jobPostService.getJobPostById(jobPostId));

        if (!studentOptional.isPresent() || !jobPostOptional.isPresent()) {
            throw new RuntimeException("Invalid Student ID or Job Post ID");
        }

        ApplicationDetails applicationDetails = new ApplicationDetails();
        applicationDetails.setStudent(studentOptional.get());
        applicationDetails.setJobPost(jobPostOptional.get());
        applicationDetails.setName(name);
        applicationDetails.setEmail(email);
        applicationDetails.setContact(contact);
        applicationDetails.setApplicationDate(LocalDate.now());
        applicationDetails.setStatus(status);

        if (!resume.isEmpty()) {
            boolean isUploaded = fUploadHelper.uploadFile(resume);
            if (isUploaded) {
                @SuppressWarnings("null")
                String fileUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/")
                        .path(resume.getOriginalFilename()).toUriString();
                applicationDetails.setResume(fileUri);
            }
        }

        return service.saveApplication(applicationDetails);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApplicationDetails> updateApplication(@PathVariable Long id,
            @RequestBody ApplicationDetails applicationDetails) {
        Optional<ApplicationDetails> existingApplication = service.getApplicationById(id);
        if (existingApplication.isPresent()) {
            return ResponseEntity.ok(service.updateApplication(id, applicationDetails));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(@PathVariable Long id) {
        Optional<ApplicationDetails> existingApplication = service.getApplicationById(id);
        if (existingApplication.isPresent()) {
            service.deleteApplication(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/CountOfApplication")
    public int StudentApplicationCount(@RequestParam Integer studentId) {
        return service.findByStudentId(studentId).size();
    }

    // Example Spring Boot endpoint in your controller
    @GetMapping("/student")
    public ResponseEntity<List<ApplicationDetails>> getApplicationsByStudentId(@RequestParam Integer studentId) {
        System.out.println("Student Id" + studentId);
        List<ApplicationDetails> applications = service.findByStudentId(studentId);
        return ResponseEntity.ok(applications);
    }

}

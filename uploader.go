package main

import (
	"fmt"
	"os"
	"os/exec"
)

func runCommand(name string, args ...string) error {
	cmd := exec.Command(name, args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}

func main() {
	gitPath := `C:\Users\PC\git-temp\cmd\git.exe`
	repoURL := "https://github.com/inha20/ProjectPromptAi.git"

	fmt.Println("🚀 Starting GitHub Upload for ProjectPromptAi...")

	// 1. Git Init
	fmt.Println("\n[1/5] Initializing Git...")
	_ = os.RemoveAll(".git") // Fresh start
	if err := runCommand(gitPath, "init"); err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	// 2. Add Remote
	fmt.Println("\n[2/5] Adding remote origin...")
	if err := runCommand(gitPath, "remote", "add", "origin", repoURL); err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	// 3. Add Files
	fmt.Println("\n[3/5] Adding files...")
	if err := runCommand(gitPath, "add", "."); err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	// 4. Commit
	fmt.Println("\n[4/5] Committing changes...")
	if err := runCommand(gitPath, "commit", "-m", "feat: implement advanced prompt engineering and modular structure (Issue #1)"); err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	// 5. Rename to main
	fmt.Println("\n[5/5] Renaming branch to main...")
	if err := runCommand(gitPath, "branch", "-M", "main"); err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	// 6. Push
	fmt.Println("\n[6/5] Pushing to GitHub (main branch)...")
	// Use --force to ensure we overwrite with our improved version if necessary
	if err := runCommand(gitPath, "push", "-u", "origin", "main", "--force"); err != nil {
		fmt.Printf("Error: %v\n", err)
		fmt.Println("\n💡 Push failed. You might need to authenticate in the terminal.")
		return
	}

	fmt.Println("\n✨ Project uploaded successfully to ProjectPromptAi!")
}

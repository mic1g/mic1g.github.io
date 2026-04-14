# GitHub SSH setup on this machine

Local status on this machine:

- Git is installed.
- Git global name is `mic1g`.
- Git global email is `junk200108@gmail.com`.
- An SSH keypair was created at `C:\Users\chaks\.ssh\id_ed25519` and `C:\Users\chaks\.ssh\id_ed25519.pub`.

Public key to add to GitHub:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMWSjQpN8O1uFOM/hFw4o6E8tbRqA63TUQPUQK9D88uL junk200108@gmail.com
```

## Finish GitHub setup

1. Open GitHub.
2. Go to `Settings` -> `SSH and GPG keys` -> `New SSH key`.
3. Title it something like `Codex Windows machine`.
4. Paste the public key above.
5. Save it.

## Verify the connection

Run:

```powershell
ssh -T git@github.com
```

Expected result:

- GitHub recognizes the account.
- You may see a message saying you have successfully authenticated but GitHub does not provide shell access.

## Clone the website repo

Repository:

```text
https://github.com/mic1g/mic1g.github.io
```

```powershell
git clone git@github.com:mic1g/mic1g.github.io.git D:\myWebsite
```

Then check the remote:

```powershell
Set-Location D:\myWebsite
git remote -v
```

## Optional: enable ssh-agent so you do not need to specify the key repeatedly

This part did not complete automatically because changing the Windows `ssh-agent` service requires an elevated PowerShell session.

Open PowerShell as Administrator and run:

```powershell
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519
ssh-add -l
```

If you do not enable `ssh-agent`, SSH can still work after the key is added to GitHub, but Windows may prompt differently depending on your SSH setup.

## Optional: if you want to test the key directly

```powershell
ssh -i $env:USERPROFILE\.ssh\id_ed25519 -T git@github.com
```


# 🛡️ Safe Shield – Cybersecurity Toolkit

This repository includes all automated scripts and resources used in the **Safe Shield** platform, designed for the **Cybersecurity Incident Response and Defense Simulation Hackathon** under a simulated enterprise system, **UniPort**.

## 📦 What's Included

### 🔍 Penetration Testing Scripts
| Script | Tool | Description |
|--------|------|-------------|
| `nmap_scan.sh` | Nmap | Performs OS detection, port scanning, and service enumeration |
| `nikto_scan.sh` | Nikto | Scans target web server for known vulnerabilities |
| `zap_scan.py` | OWASP ZAP | Runs spider and active scan using ZAP API |
| `burp_checklist.txt` | Burp Suite | Manual checklist for vulnerability testing in UniPort |

### 💣 Exploitation Simulation
| Script | Tool | Description |
|--------|------|-------------|
| `metasploit_exploit.sh` | Metasploit | Simulated vsftpd backdoor exploit for demonstration only |

### 📊 Log Analysis and Visualization
| Script | Description |
|--------|-------------|
| `log_parser.py` | Parses `log.txt` and summarizes incident types |
| `log_visualizer.py` | Creates a bar chart of incident frequencies from `log.txt` |

### 🧹 Utilities
| Script | Description |
|--------|-------------|
| `cleanup.sh` | Removes temporary files and reports from previous runs |

---

## 🔧 Requirements

- Kali Linux or any Debian-based system
- Python 3.x
- Metasploit Framework
- OWASP ZAP (with API enabled)
- Nikto, Nmap
- Python Libraries: `matplotlib`, `collections`

Install Python dependencies with:
```bash
pip3 install matplotlib
```

---

## 🧪 Usage

1. Make scripts executable:
```bash
chmod +x *.sh
```

2. Run scanning tools:
```bash
./nmap_scan.sh 127.0.0.1
./nikto_scan.sh http://127.0.0.1:8000
python3 zap_scan.py
```

3. Simulate exploitation:
```bash
./metasploit_exploit.sh 127.0.0.1
```

4. Analyze and visualize logs:
```bash
python3 log_parser.py
python3 log_visualizer.py
```

---

## 📁 Sample Log Format (log.txt)
```
2025-07-20 10:00:00 - XSS
2025-07-20 10:05:00 - Brute Force
2025-07-20 10:20:00 - SQL Injection
```

---

## 👨‍🏫 Author & Contact
Developed as part of the Safe Shield cybersecurity project for the Digital Talent Program.

GitHub: [Safe Shield](https://github.com/enock-niyonsaba/safe_shield_DTP)  
Email: enockccg28@gmail.com

---

© 2025 Safe Shield Security Team | For educational and demonstration purposes only.

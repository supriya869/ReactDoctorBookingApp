$BASE_URL = "http://localhost:8035"

Write-Host "=== 1️⃣ Register User ==="
curl -Method POST "$BASE_URL/api/auth/register" `
  -ContentType "application/json" `
  -Body '{"email":"supriya@example.com","password":"mypassword123"}'
Write-Host "`n"

Write-Host "=== 2️⃣ Login User ==="
$loginResponse = curl -Method POST "$BASE_URL/api/auth/login" `
  -ContentType "application/json" `
  -Body '{"email":"supriya@example.com","password":"mypassword123"}'
$token = ($loginResponse.Content | ConvertFrom-Json).token
Write-Host "Token: $token`n"

Write-Host "=== 3️⃣ Get All Doctors ==="
curl -Method GET "$BASE_URL/api/doctors"
Write-Host "`n"

Write-Host "=== 4️⃣ Book Appointment ==="
curl -Method POST "$BASE_URL/api/bookings" `
  -Headers @{ "Authorization" = "Bearer $token" } `
  -ContentType "application/json" `
  -Body '{"doctorId":1,"slot":"2025-11-05 10:00 AM"}'
Write-Host "`n"

Write-Host "=== 5️⃣ Get My Bookings ==="
curl -Method GET "$BASE_URL/api/bookings/mine" `
  -Headers @{ "Authorization" = "Bearer $token" }
Write-Host "`n=== ✅ API Test Completed ==="

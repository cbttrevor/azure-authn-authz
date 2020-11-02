$Keys = Get-AzStorageAccountKey -Name trevorsullivan -ResourceGroupName storage

$Context = New-AzStorageContext -StorageAccountName trevorsullivan -StorageAccountKey $Keys[0].Value

New-AzResourceGroup -Name storage -Location 'West US 2'

New-AzStorageAccount -Location 'West US 2' -ResourceGroupName storage -Name trevorsullivan -SkuName Standard_LRS



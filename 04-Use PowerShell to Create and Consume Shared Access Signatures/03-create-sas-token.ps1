New-AzStorageContainer -Context $Context -Name videos

$Token = New-AzStorageContainerSASToken -Context $Context -Name videos -Permission rwd

$ContainerContext = New-AzStorageContext -SasToken $Token -StorageAccountName trevorsullivan

Set-AzStorageBlobContent -Context $ContainerContext -Container videos -File $HOME/Downloads/PowerShellLinuxDockerNETCoreIntro.mp4


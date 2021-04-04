// Windows Template Library - WTL version 10.0
// Copyright (C) Microsoft Corporation, WTL Team. All rights reserved.
//
// This file is a part of the Windows Template Library.
// The use and distribution terms for this software are covered by the
// Microsoft Public License (http://opensource.org/licenses/MS-PL)
// which can be found in the file MS-PL.txt at the root folder.


function OnFinish(selProj, selObj)
{
	try
	{
		var strProjectPath = wizard.FindSymbol('PROJECT_PATH');
		var strProjectName = wizard.FindSymbol('PROJECT_NAME');

		// Create symbols based on the project name
		var strSafeProjectName = CreateSafeName(strProjectName);
		wizard.AddSymbol("SAFE_PROJECT_NAME", strSafeProjectName);
		wizard.AddSymbol("NICE_SAFE_PROJECT_NAME", strSafeProjectName.substr(0, 1).toUpperCase() + strSafeProjectName.substr(1))
		wizard.AddSymbol("UPPERCASE_SAFE_PROJECT_NAME", strSafeProjectName.toUpperCase());

		// Set current year symbol
		var d = new Date();
		var nYear = 0;
		nYear = d.getFullYear();
		if(nYear >= 2003)
			wizard.AddSymbol("WTL_CURRENT_YEAR", nYear);

		// Set APPID and LIBID symbols for COM servers
		if(wizard.FindSymbol("WTL_COM_SERVER"))
		{
			var strGuid = wizard.CreateGuid();
			var strVal = wizard.FormatGuid(strGuid, 0);
			wizard.AddSymbol("WTL_APPID", strVal);

			strGuid = wizard.CreateGuid();
			strVal = wizard.FormatGuid(strGuid, 0);
			wizard.AddSymbol("WTL_LIBID", strVal);
		}

		if(wizard.FindSymbol("WTL_SUPPORT_WINXP"))
		{
			wizard.AddSymbol("WTL_USE_RIBBON", false);
		}

		// Set app type symbols
		if (wizard.FindSymbol("WTL_APPTYPE_SDI") || wizard.FindSymbol("WTL_APPTYPE_MTSDI") || 
		    wizard.FindSymbol("WTL_APPTYPE_TABVIEW") || wizard.FindSymbol("WTL_APPTYPE_EXPLORER"))
		{
			if (wizard.FindSymbol("WTL_USE_RIBBON"))
				wizard.AddSymbol("WTL_FRAME_BASE_CLASS","CRibbonFrameWindowImpl");
			else
				wizard.AddSymbol("WTL_FRAME_BASE_CLASS","CFrameWindowImpl");
		}
		else if(wizard.FindSymbol("WTL_APPTYPE_MDI"))
		{
			wizard.AddSymbol("WTL_FRAME_BASE_CLASS", "CMDIFrameWindowImpl");
			wizard.AddSymbol("WTL_CHILD_FRAME_BASE_CLASS","CMDIChildWindowImpl");
			wizard.AddSymbol("WTL_USE_RIBBON", false);
		}
		else if(wizard.FindSymbol("WTL_APPTYPE_DLG"))
		{
			wizard.AddSymbol("WTL_MAINDLG_CLASS","CMainDlg");
			if(wizard.FindSymbol("WTL_ENABLE_AX"))
				wizard.AddSymbol("WTL_MAINDLG_BASE_CLASS", "CAxDialogImpl");
			else
				wizard.AddSymbol("WTL_MAINDLG_BASE_CLASS", "CDialogImpl");

			wizard.AddSymbol("WTL_USE_RIBBON", false);
			wizard.AddSymbol("WTL_USE_TOOLBAR", false);
			wizard.AddSymbol("WTL_USE_REBAR", false);
			wizard.AddSymbol("WTL_USE_CMDBAR", false);
			wizard.AddSymbol("WTL_USE_STATUSBAR", false);
			wizard.AddSymbol("WTL_USE_VIEW", false);
		}

		if (wizard.FindSymbol("WTL_USE_RIBBON"))
		{
			if (wizard.FindSymbol("WTL_USE_TOOLBAR"))
			{
				wizard.AddSymbol("WTL_RIBBON_DUAL_UI", true);
				wizard.AddSymbol("WTL_RIBBON_SINGLE_UI", false);
			}
			else
			{
				wizard.AddSymbol("WTL_RIBBON_DUAL_UI", false);
				wizard.AddSymbol("WTL_RIBBON_SINGLE_UI", true);
			}
		}
		else
		{
			wizard.AddSymbol("WTL_RIBBON_DUAL_UI", false);
			wizard.AddSymbol("WTL_RIBBON_SINGLE_UI", false);
		}

		// Set view symbols
		if(wizard.FindSymbol("WTL_USE_VIEW"))
		{
			wizard.AddSymbol("WTL_VIEW_FILE", "View");
			wizard.AddSymbol("WTL_VIEW_CLASS", "CView");

			wizard.AddSymbol("WTL_VIEWTYPE_GENERIC", false);
			var strView = wizard.FindSymbol("WTL_COMBO_VIEW_TYPE");
			switch(strView)
			{
			case "WTL_VIEWTYPE_FORM":
				wizard.AddSymbol("WTL_VIEWTYPE_FORM", true);
				if(wizard.FindSymbol("WTL_ENABLE_AX") && wizard.FindSymbol("WTL_HOST_AX"))
					wizard.AddSymbol("WTL_VIEW_BASE_CLASS", "CAxDialogImpl");
				else
					wizard.AddSymbol("WTL_VIEW_BASE_CLASS", "CDialogImpl");
				break;
			case "WTL_VIEWTYPE_LISTBOX":
				wizard.AddSymbol("WTL_VIEWTYPE_LISTBOX", true);
				wizard.AddSymbol("WTL_VIEW_BASE", "CListBox");
				wizard.AddSymbol("WTL_VIEW_STYLES", "WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | LBS_NOINTEGRALHEIGHT | LBS_NOTIFY | LBS_WANTKEYBOARDINPUT");
				break;
			case "WTL_VIEWTYPE_EDIT":
				wizard.AddSymbol("WTL_VIEWTYPE_EDIT", true);
				wizard.AddSymbol("WTL_VIEW_BASE", "CEdit");
				wizard.AddSymbol("WTL_VIEW_STYLES", "WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_HSCROLL | WS_VSCROLL | ES_AUTOHSCROLL | ES_AUTOVSCROLL | ES_MULTILINE | ES_NOHIDESEL");
				break;
			case "WTL_VIEWTYPE_LISTVIEW":
				wizard.AddSymbol("WTL_VIEWTYPE_LISTVIEW", true);
				wizard.AddSymbol("WTL_VIEW_BASE", "CListViewCtrl");
				wizard.AddSymbol("WTL_VIEW_STYLES", "WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | LVS_REPORT | LVS_SHOWSELALWAYS");
				break;
			case "WTL_VIEWTYPE_TREEVIEW":
				wizard.AddSymbol("WTL_VIEWTYPE_TREEVIEW", true);
				wizard.AddSymbol("WTL_VIEW_BASE", "CTreeViewCtrl");
				wizard.AddSymbol("WTL_VIEW_STYLES", "WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | TVS_HASLINES | TVS_LINESATROOT | TVS_SHOWSELALWAYS");
				break;
			case "WTL_VIEWTYPE_RICHEDIT":
				wizard.AddSymbol("WTL_VIEWTYPE_RICHEDIT", true);
				wizard.AddSymbol("WTL_VIEW_BASE", "CRichEditCtrl");
				wizard.AddSymbol("WTL_VIEW_STYLES", "WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_HSCROLL | WS_VSCROLL | ES_AUTOHSCROLL | ES_AUTOVSCROLL | ES_MULTILINE | ES_NOHIDESEL | ES_SAVESEL");
				break;
			case "WTL_VIEWTYPE_HTML":
				wizard.AddSymbol("WTL_VIEWTYPE_HTML", true);
				wizard.AddSymbol("WTL_VIEW_BASE", "CAxWindow");
				wizard.AddSymbol("WTL_ENABLE_AX", true);
				wizard.AddSymbol("WTL_VIEW_STYLES", "WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_HSCROLL | WS_VSCROLL");
				break;
			case "WTL_VIEWTYPE_SCROLL":
				wizard.AddSymbol("WTL_VIEWTYPE_SCROLL", true);
				wizard.AddSymbol("WTL_VIEW_BASE_CLASS", "CScrollWindowImpl");
				wizard.AddSymbol("WTL_VIEW_STYLES", "WS_CHILD | WS_VISIBLE | WS_CLIPSIBLINGS | WS_CLIPCHILDREN | WS_HSCROLL | WS_VSCROLL");
				break;
			default:
				wizard.AddSymbol("WTL_VIEWTYPE_GENERIC", true);
				break;
			}

			if(wizard.FindSymbol("WTL_APPTYPE_TABVIEW"))
				wizard.AddSymbol("WTL_VIEW_EX_STYLES", "0");
		}

		// Create project and configurations
		selProj = CreateCustomProject(strProjectName, strProjectPath);
		AddConfigurations(selProj, strProjectName);
		AddFilters(selProj);

		var InfFile = CreateCustomInfFile();
		AddFilesToCustomProj(selProj, strProjectName, strProjectPath, InfFile);
		AddPchSettings(selProj);
			
		if (wizard.FindSymbol("WTL_USE_RIBBON"))
			AddRibbonSettings(selProj);
			
		InfFile.Delete();

		selProj.Object.Save();

		// Open resource editor if needed
		if(wizard.FindSymbol("WTL_APPTYPE_DLG"))
		{
			var ResHelper = wizard.ResourceHelper;
			ResHelper.OpenResourceFile(strProjectPath + "\\" + strProjectName + ".rc");
			ResHelper.OpenResourceInEditor("DIALOG", "IDD_MAINDLG");
			ResHelper.CloseResourceFile();
		}
		else if(wizard.FindSymbol("WTL_USE_VIEW") && wizard.FindSymbol("WTL_VIEWTYPE_FORM"))
		{
			var strDialogID = "IDD_" + wizard.FindSymbol("UPPERCASE_SAFE_PROJECT_NAME") + "_FORM";
			var ResHelper = wizard.ResourceHelper;
			ResHelper.OpenResourceFile(strProjectPath + "\\" + strProjectName + ".rc");
			ResHelper.OpenResourceInEditor("DIALOG", strDialogID);
			ResHelper.CloseResourceFile();
		}
	}
	catch(e)
	{
		if (e.description.length != 0)
			SetErrorInfo(e);
		return e.number
	}
}

function CreateCustomProject(strProjectName, strProjectPath)
{
	try
	{
		var strProjTemplatePath = wizard.FindSymbol('PROJECT_TEMPLATE_PATH');
		var strProjTemplate = '';
		var WizardVersion = wizard.FindSymbol('WIZARD_VERSION');
		if(WizardVersion >= 10.0)
			strProjTemplate = strProjTemplatePath + '\\default.vcxproj';
		else
			strProjTemplate = strProjTemplatePath + '\\default.vcproj';

		var Solution = dte.Solution;
		var strSolutionName = "";
		if (wizard.FindSymbol("CLOSE_SOLUTION"))
		{
			Solution.Close();
			strSolutionName = wizard.FindSymbol("VS_SOLUTION_NAME");
			if (strSolutionName.length)
			{
				var strSolutionPath = strProjectPath.substr(0, strProjectPath.length - strProjectName.length);
				Solution.Create(strSolutionPath, strSolutionName);
			}
		}

		var strProjectNameWithExt = '';
		if(WizardVersion >= 10.0)
			strProjectNameWithExt = strProjectName + '.vcxproj';
		else
			strProjectNameWithExt = strProjectName + '.vcproj';

		var oTarget = wizard.FindSymbol("TARGET");
		var prj;
		if (wizard.FindSymbol("WIZARD_TYPE") == vsWizardAddSubProject)  // vsWizardAddSubProject
		{
			var prjItem = oTarget.AddFromTemplate(strProjTemplate, strProjectNameWithExt);
			prj = prjItem.SubProject;
		}
		else
		{
			prj = oTarget.AddFromTemplate(strProjTemplate, strProjectPath, strProjectNameWithExt);
		}
		return prj;
	}
	catch(e)
	{
		throw e;
	}
}

function AddFilters(proj)
{
	try
	{
		// Add the folders to your project
		var strSrcFilter = wizard.FindSymbol('SOURCE_FILTER');
		var group = proj.Object.AddFilter('Source Files');
		group.Filter = strSrcFilter;

		strSrcFilter = wizard.FindSymbol('INCLUDE_FILTER');
		group = proj.Object.AddFilter('Header Files');
		group.Filter = strSrcFilter;

		strSrcFilter = wizard.FindSymbol('RESOURCE_FILTER');
		group = proj.Object.AddFilter('Resource Files');
		group.Filter = strSrcFilter;
	}
	catch(e)
	{
		throw e;
	}
}

function AddConfigurations(proj, strProjectName)
{
	try
	{
		for(var i = 0; i < proj.Object.Configurations.Count; i++)
		{
			var config = proj.Object.Configurations.Item(i + 1);

			// Check if it's Debug configuration
			var bDebug = (config.ConfigurationName.search("Debug") != -1);

			// General settings
			config.CharacterSet = charSetUnicode;

			var WizardVersion = wizard.FindSymbol('WIZARD_VERSION');
			if(bDebug)
			{
				if(WizardVersion < 8.0)
				{
					config.IntermediateDirectory = 'Debug';
					config.OutputDirectory = 'Debug';
				}

				config.ATLMinimizesCRunTimeLibraryUsage = false;
			}
			else
			{
				if(WizardVersion < 8.0)
				{
					config.IntermediateDirectory = 'Release';
					config.OutputDirectory = 'Release';
				}

				config.ATLMinimizesCRunTimeLibraryUsage = false;
			}

			if(wizard.FindSymbol("WTL_USE_VIEW") && wizard.FindSymbol("WTL_COMBO_VIEW_TYPE") == "WTL_VIEWTYPE_HTML")
				config.UseOfATL = useATLDynamic;

			// Compiler settings
			var CLTool = config.Tools('VCCLCompilerTool');
			CLTool.UsePrecompiledHeader = pchUseUsingSpecific;
			CLTool.WarningLevel = warningLevel_3;
			if(bDebug)
			{
				CLTool.RuntimeLibrary = rtMultiThreadedDebug;
				CLTool.MinimalRebuild = true;
				CLTool.DebugInformationFormat = debugEditAndContinue;
				CLTool.BasicRuntimeChecks = runtimeBasicCheckAll;
				CLTool.Optimization = optimizeDisabled;
			}
			else
			{
				CLTool.RuntimeLibrary = rtMultiThreaded;
				CLTool.ExceptionHandling = false;
				CLTool.DebugInformationFormat = debugDisabled;
			}

			var strDefines = GetPlatformDefine(config);
			strDefines += "_WINDOWS;STRICT;";
			if(bDebug)
				strDefines += "_DEBUG";
			else
				strDefines += "NDEBUG";
			CLTool.PreprocessorDefinitions = strDefines;

			// Linker settings
			var LinkTool = config.Tools('VCLinkerTool');
			LinkTool.SubSystem = subSystemWindows;
			if(bDebug)
			{
				LinkTool.LinkIncremental = linkIncrementalYes;
				LinkTool.GenerateDebugInformation = true;
			}
			else
			{
				LinkTool.LinkIncremental = linkIncrementalNo;
			}

			if (wizard.FindSymbol("WTL_USE_RIBBON"))
			{
				LinkTool.DelayLoadDLLs = "propsys.dll;dwmapi.dll";
			}

			// Resource settings
			var RCTool = config.Tools("VCResourceCompilerTool");
			RCTool.Culture = rcEnglishUS;
			RCTool.AdditionalIncludeDirectories = "$(IntDir)";
			if(bDebug)
				RCTool.PreprocessorDefinitions = "_DEBUG";
			else
				RCTool.PreprocessorDefinitions = "NDEBUG";

			// MIDL settings
			var MidlTool = config.Tools("VCMidlTool");
			MidlTool.MkTypLibCompatible = false;
			if(IsPlatformWin32(config))
				MidlTool.TargetEnvironment = midlTargetWin32;
			if(bDebug)
				MidlTool.PreprocessorDefinitions = "_DEBUG";
			else
				MidlTool.PreprocessorDefinitions = "NDEBUG";
			MidlTool.HeaderFileName = strProjectName + ".h";
			MidlTool.InterfaceIdentifierFileName = strProjectName + "_i.c";
			MidlTool.ProxyFileName = strProjectName + "_p.c";
			MidlTool.GenerateStublessProxies = true;
			MidlTool.TypeLibraryName = "$(IntDir)/" + strProjectName + ".tlb";
			MidlTool.DLLDataFileName = "";

			// Post-build settings
			if(wizard.FindSymbol('WTL_COM_SERVER'))
			{
				var PostBuildTool = config.Tools("VCPostBuildEventTool");
				PostBuildTool.Description = "Performing registration...";
				PostBuildTool.CommandLine = "\"$(TargetPath)\" /RegServer";
			}
		}
	}
	catch(e)
	{
		throw e;
	}
}

function AddPchSettings(proj)
{
	try
	{
		var files = proj.Object.Files;
		var fStdafx = files("StdAfx.cpp");

		for(var i = 0; i < fStdafx.FileConfigurations.Count; i++)
		{
			var config = fStdafx.FileConfigurations.Item(i + 1);
			config.Tool.UsePrecompiledHeader = pchCreateUsingSpecific;
		}
	}
	catch(e)
	{
		throw e;
	}
}

function AddRibbonSettings(proj)
{
	try
	{
		var files = proj.Object.Files;
		var fRibbon = files("Ribbon.xml");

		for(var i = 0; i < fRibbon.FileConfigurations.Count; i++)
		{
			var config = fRibbon.FileConfigurations.Item(i + 1);
			config.Tool.Description = "Compiling Ribbon.xml";
			config.Tool.CommandLine = "uicc Ribbon.xml Ribbon.bml /header:Ribbon.h /res:Ribbon.rc";
			config.Tool.Outputs = "Ribbon.bml;Ribbon.rc;Ribbon.h";
		}
	}
	catch(e)
	{
		throw e;
	}
}

function DelFile(fso, strWizTempFile)
{
	try
	{
		if (fso.FileExists(strWizTempFile))
		{
			var tmpFile = fso.GetFile(strWizTempFile);
			tmpFile.Delete();
		}
	}
	catch(e)
	{
		throw e;
	}
}

function CreateCustomInfFile()
{
	try
	{
		var fso, TemplatesFolder, TemplateFiles, strTemplate;
		fso = new ActiveXObject('Scripting.FileSystemObject');

		var TemporaryFolder = 2;
		var tfolder = fso.GetSpecialFolder(TemporaryFolder);

		var strWizTempFile = tfolder.Path + "\\" + fso.GetTempName();

		var strTemplatePath = wizard.FindSymbol('TEMPLATES_PATH');
		var strInfFile = strTemplatePath + '\\Templates.inf';
		wizard.RenderTemplate(strInfFile, strWizTempFile);

		var WizTempFile = fso.GetFile(strWizTempFile);
		return WizTempFile;
	}
	catch(e)
	{
		throw e;
	}
}

function GetTargetName(strName, strProjectName)
{
	try
	{
		var strTarget = strName;
		var strResPath = "res\\";

		if(strName.substr(0, 4) == "root")
		{
			var nNameLen = strName.length;
			if(strName == "root.ico" || strName == "rootDoc.ico" || strName == "root.exe.manifest")
			{
				strTarget = strResPath + strProjectName + strName.substr(4, nNameLen - 4);
			}
			else
			{
				strTarget = strProjectName + strName.substr(4, nNameLen - 4);
			}
		}
		else if(strName == 'frame.h')
		{
			strTarget = 'MainFrm.h';
		}
		else if(strName == 'frame.cpp')
		{
			strTarget = 'MainFrm.cpp';
		}
		else if(strName == 'view.h')
		{
			strTarget = 'View.h';
		}
		else if(strName == 'view.cpp')
		{
			strTarget = 'View.cpp';
		}
		else if(strName == 'toolbar.bmp')
		{
			strTarget = strResPath + strName;
		}

		return strTarget; 
	}
	catch(e)
	{
		throw e;
	}
}

function AddFilesToCustomProj(proj, strProjectName, strProjectPath, InfFile)
{
	try
	{
		var projItems = proj.ProjectItems

		var strTemplatePath = wizard.FindSymbol('TEMPLATES_PATH');

		var strTpl = '';
		var strName = '';

		var strTextStream = InfFile.OpenAsTextStream(1, -2);
		while (!strTextStream.AtEndOfStream)
		{
			strTpl = strTextStream.ReadLine();
			if (strTpl != '')
			{
				strName = strTpl;
				var strTarget = GetTargetName(strName, strProjectName);
				var strTemplate = strTemplatePath + '\\' + strTpl;
				var strFile = strProjectPath + '\\' + strTarget;

				var bCopyOnly = false;  //"true" will only copy the file from strTemplate to strTarget without rendering/adding to the project
				var strExt = strName.substr(strName.lastIndexOf("."));
				if(strExt==".bmp" || strExt==".ico" || strExt==".gif" || strExt==".rtf" || strExt==".css")
					bCopyOnly = true;
				wizard.RenderTemplate(strTemplate, strFile, bCopyOnly);

				// don't add these files to the project
				if(strTarget == strProjectName + ".h" ||
				   strTarget == strProjectName + "ps.mk" ||
				   strTarget == strProjectName + "ps.def")
					continue;

				proj.Object.AddFile(strFile);
			}
		}
		strTextStream.Close();
	}
	catch(e)
	{
		throw e;
	}
}

// SIG // Begin signature block
// SIG // MIIFsAYJKoZIhvcNAQcCoIIFoTCCBZ0CAQExDjAMBggq
// SIG // hkiG9w0CBQUAMGYGCisGAQQBgjcCAQSgWDBWMDIGCisG
// SIG // AQQBgjcCAR4wJAIBAQQQEODJBs441BGiowAQS9NQkAIB
// SIG // AAIBAAIBAAIBAAIBADAgMAwGCCqGSIb3DQIFBQAEEIc4
// SIG // LK9vA3HXQqb72ouCkeqgggNCMIIDPjCCAiqgAwIBAgIQ
// SIG // GGxPs3ZR1LxPeWzrXY0HXzAJBgUrDgMCHQUAMCwxKjAo
// SIG // BgNVBAMTIVBvd2VyU2hlbGwgTG9jYWwgQ2VydGlmaWNh
// SIG // dGUgUm9vdDAeFw0xODA5MjcwNTQ0NDNaFw0zOTEyMzEy
// SIG // MzU5NTlaMBoxGDAWBgNVBAMTD1Bvd2VyU2hlbGwgVXNl
// SIG // cjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEB
// SIG // AMKW3NK2qZWsv5RbBEC7dE7bTxxkkPOMW+7Ks7HZ7KkR
// SIG // 4Ojikr33nimgJoqq5d8cO4PnPpDk1ZtKdvjcwfwDxTR1
// SIG // YbDfXPpaY8LLg/UOjfy2kRA4RC8wW6Ky4+/r/22DxyN3
// SIG // rDbVzbKdXBB/dqOlrVYORZwew1yV22OLjUccmbF86bm1
// SIG // oYYnSK+jIRdWDLKsAVkU6GKo4c8U+vDe/eu0AZJAuYOf
// SIG // naQ3K2y7D3Lz0A4vOyRQdTlJceT2JPRxENAzwhzZehSI
// SIG // rekZwSh25CYS9yb0bY+U/lVVyU/mTZzx7pEakkD1afgL
// SIG // 8uzwOWb/rkpa/un1B6OdLH62JmwZ8Pn2Ko0CAwEAAaN2
// SIG // MHQwEwYDVR0lBAwwCgYIKwYBBQUHAwMwXQYDVR0BBFYw
// SIG // VIAQR19nwP4BviD3TmIj9uoZsKEuMCwxKjAoBgNVBAMT
// SIG // IVBvd2VyU2hlbGwgTG9jYWwgQ2VydGlmaWNhdGUgUm9v
// SIG // dIIQ6g/CZU4e/o5Ffoids+zrSTAJBgUrDgMCHQUAA4IB
// SIG // AQCnMgSDRI5TU8+fIkrNsDbyyBS9MpRcds6tjkPeDH9w
// SIG // 11Eh+iJESskd0VCEt6Qk9Zn799d+nQlWGJVMitedHCk9
// SIG // Ko8hH9njFnS4zPJKvl9+h8MgwBjpr3nkxOjNMBOTluA9
// SIG // ZXATTxw6QhYlxFRbLf4RbnjKlDTl7Q8oGYiq+IsV+ssa
// SIG // sQba+rE1dBRurn+0Syot9wAikzE6TKEBXRmp6A7TwBTh
// SIG // pTpKRhK1BaUtoO46Eq/56PLMQj5mN9gnQFG+CwI5dATv
// SIG // Hl7rWkaeogNFXS5O9hqVjYVfJqqwHMUGYCy5lFIprW7d
// SIG // jF6FpWVD7xr0VoF5gba7BfkQcw/+14XN6RprMYIB2DCC
// SIG // AdQCAQEwQDAsMSowKAYDVQQDEyFQb3dlclNoZWxsIExv
// SIG // Y2FsIENlcnRpZmljYXRlIFJvb3QCEBhsT7N2UdS8T3ls
// SIG // 612NB18wDAYIKoZIhvcNAgUFAKBsMBAGCisGAQQBgjcC
// SIG // AQwxAjAAMBkGCSqGSIb3DQEJAzEMBgorBgEEAYI3AgEE
// SIG // MBwGCisGAQQBgjcCAQsxDjAMBgorBgEEAYI3AgEVMB8G
// SIG // CSqGSIb3DQEJBDESBBDKqPikx+hsKJsVBuP66yZ9MA0G
// SIG // CSqGSIb3DQEBAQUABIIBALtobtuGKIKc/Cw5LfY4hzzD
// SIG // YxxKy1uOmuoEbC2397SrYHU3SeztHS8hpmj9KlfvGFOk
// SIG // j+rQXY+sF2pgvJBe3JgPyVmz7L4minmuvdZ9JSeWQ1Uk
// SIG // bMC3cluo4Oo7Wmczkm6svDel/a5kVqAfSAyK+sRCsN/e
// SIG // vFAWQm1HHbIDx+twbnz/2u+9CrwFPtrQWVcDZ0YtNidh
// SIG // NVf4JufYCrp08hohDehhKmZidv+4pgEB1eSJd2+xE7CH
// SIG // rC19RwIU9PhA48yWrK/R7SnJL0Clq7G7lgEkvjLTVHgD
// SIG // 6DLJNCrFIcn7Rdl9b1H7WAJKLsgz0TCZYC9yHhKwLzSU
// SIG // F6rXzPXDlnI=
// SIG // End signature block

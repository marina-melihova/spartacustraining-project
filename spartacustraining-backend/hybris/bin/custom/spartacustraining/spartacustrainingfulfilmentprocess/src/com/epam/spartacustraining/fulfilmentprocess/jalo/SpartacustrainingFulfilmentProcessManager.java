/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package com.epam.spartacustraining.fulfilmentprocess.jalo;

import de.hybris.platform.jalo.JaloSession;
import de.hybris.platform.jalo.extension.ExtensionManager;
import com.epam.spartacustraining.fulfilmentprocess.constants.SpartacustrainingFulfilmentProcessConstants;

public class SpartacustrainingFulfilmentProcessManager extends GeneratedSpartacustrainingFulfilmentProcessManager
{
	public static final SpartacustrainingFulfilmentProcessManager getInstance()
	{
		ExtensionManager em = JaloSession.getCurrentSession().getExtensionManager();
		return (SpartacustrainingFulfilmentProcessManager) em.getExtension(SpartacustrainingFulfilmentProcessConstants.EXTENSIONNAME);
	}
	
}

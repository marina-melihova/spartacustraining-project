/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package com.epam.spartacustraining.core.jalo;

import de.hybris.platform.jalo.JaloSession;
import de.hybris.platform.jalo.extension.ExtensionManager;
import com.epam.spartacustraining.core.constants.SpartacustrainingCoreConstants;
import com.epam.spartacustraining.core.setup.CoreSystemSetup;


/**
 * Do not use, please use {@link CoreSystemSetup} instead.
 * 
 */
public class SpartacustrainingCoreManager extends GeneratedSpartacustrainingCoreManager
{
	public static final SpartacustrainingCoreManager getInstance()
	{
		final ExtensionManager em = JaloSession.getCurrentSession().getExtensionManager();
		return (SpartacustrainingCoreManager) em.getExtension(SpartacustrainingCoreConstants.EXTENSIONNAME);
	}
}

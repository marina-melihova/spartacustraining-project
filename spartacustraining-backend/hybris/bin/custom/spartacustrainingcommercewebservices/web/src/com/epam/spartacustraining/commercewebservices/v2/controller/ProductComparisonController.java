package com.epam.spartacustraining.commercewebservices.v2.controller;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import de.hybris.platform.commercefacades.product.ProductFacade;
import de.hybris.platform.commercefacades.product.ProductOption;
import de.hybris.platform.commercefacades.product.data.ClassificationData;
import de.hybris.platform.commercefacades.product.data.ProductData;
import de.hybris.platform.commercewebservicescommons.dto.product.ClassificationWsDTO;
import de.hybris.platform.commercewebservicescommons.dto.product.ProductWsDTO;
import de.hybris.platform.webservicescommons.mapping.DataMapper;

import com.epam.spartacustraining.commercewebservices.dto.ComparisonProductsWsDTO;

@Controller
@RequestMapping(value = "/{baseSiteId}/comparison")
public class ProductComparisonController
{

	private final static String fields = "DEFAULT,images,classifications";
	private final static Set<ProductOption> OPTIONS = new HashSet<>(Arrays.asList(ProductOption.values()));

	@Resource(name = "cwsProductFacade")
	private ProductFacade productFacade;
	@Resource(name = "dataMapper")
	private DataMapper dataMapper;

	@GetMapping("/products/{products}")
	public ResponseEntity<ComparisonProductsWsDTO>
	getComparisonProductsWsDTO(@PathVariable final String products)
	{
		List<ProductData> productData =
				getProducts(products).stream()
						.map(code ->
								productFacade.getProductForCodeAndOptions(code, OPTIONS))
						.collect(Collectors.toList());
		return
				ResponseEntity.status(HttpStatus.OK).body(getComparisonProductsDto(productData));
	}
	private List<String> getProducts(String s)
	{
		return Arrays.asList(s.split(","));
	}
	private ComparisonProductsWsDTO
	getComparisonProductsDto(List<ProductData> productData)
	{
		ComparisonProductsWsDTO comparisonProductsDto = new
				ComparisonProductsWsDTO();
		comparisonProductsDto.setProducts(dataMapper.mapAsList(productData, ProductWsDTO.class, fields));
		comparisonProductsDto.setClassifications(dataMapper.mapAsList(getClassificationData(productData),
						ClassificationWsDTO.class, "code,name,features"));
		return comparisonProductsDto;
	}
	private List<ClassificationData>
	getClassificationData(List<ProductData> productData)
	{
		List<ClassificationData> allClassifications = new ArrayList<>();
		productData.stream()
				.filter(Objects::nonNull)
				.map(ProductData::getClassifications)
				.filter(Objects::nonNull)
				.forEach(classifications -> classifications
						.stream()
						.filter(Objects::nonNull)
						.forEach(classification -> {
							if (!contains(allClassifications,
									classification)) {
								allClassifications.add(classification);
							}
						}));
		return allClassifications;
	}
	private boolean contains(List<ClassificationData> list, ClassificationData classification)
	{
		return list.stream()
				.anyMatch(x -> x.getCode().equals(classification.getCode()));
	}
}

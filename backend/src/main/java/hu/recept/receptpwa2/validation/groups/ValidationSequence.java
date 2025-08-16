package hu.recept.receptpwa2.validation.groups;

import jakarta.validation.GroupSequence;

@GroupSequence({BasicValidation.class, AdvancedValidation.class})
public interface ValidationSequence {}
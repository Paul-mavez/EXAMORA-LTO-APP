package com.examora.ltoreviewer.ui.components

import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.Image
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.examora.ltoreviewer.domain.model.*
import com.examora.ltoreviewer.ui.theme.RoadSafetyAccent
import com.examora.ltoreviewer.ui.theme.SemanticError
import com.examora.ltoreviewer.ui.theme.SemanticSuccess

@Composable
fun PrimaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true
) {
    Button(
        onClick = onClick,
        enabled = enabled,
        shape = RoundedCornerShape(12.dp),
        modifier = modifier.heightIn(min = 48.dp)
    ) {
        Text(text = text, fontWeight = FontWeight.SemiBold)
    }
}

@Composable
fun SecondaryButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true
) {
    OutlinedButton(
        onClick = onClick,
        enabled = enabled,
        shape = RoundedCornerShape(12.dp),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline),
        modifier = modifier.heightIn(min = 48.dp)
    ) {
        Text(text = text, fontWeight = FontWeight.Medium)
    }
}

@Composable
fun ProgressIndicator(
    progress: Float,
    modifier: Modifier = Modifier
) {
    LinearProgressIndicator(
        progress = { progress.coerceIn(0f, 1f) },
        color = RoadSafetyAccent,
        trackColor = MaterialTheme.colorScheme.outline,
        modifier = modifier
            .fillMaxWidth()
            .height(8.dp)
    )
}

@Composable
fun CategoryCard(
    category: Category,
    progressRatio: Float,
    onClick: () -> Unit
) {
    Surface(
        shape = RoundedCornerShape(16.dp),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline),
        color = MaterialTheme.colorScheme.surface,
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
    ) {
        Column(modifier = Modifier.padding(20.dp)) {
            Text(
                text = category.title,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(6.dp))
            Text(
                text = category.description,
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(14.dp))
            ProgressIndicator(progress = progressRatio)
        }
    }
}

@Composable
fun LessonCard(
    lesson: Lesson,
    isCompleted: Boolean,
    onOpen: () -> Unit
) {
    Surface(
        shape = RoundedCornerShape(16.dp),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline),
        color = MaterialTheme.colorScheme.surface,
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onOpen)
    ) {
        Row(
            modifier = Modifier.padding(18.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(lesson.title, fontWeight = FontWeight.SemiBold)
                if (isCompleted) {
                    Text(
                        text = "Completed",
                        color = SemanticSuccess,
                        style = MaterialTheme.typography.labelSmall
                    )
                }
            }
            Icon(Icons.Outlined.ChevronRight, contentDescription = null)
        }
    }
}

@Composable
fun AnswerOption(
    choice: QuestionChoice,
    isSelected: Boolean,
    isRevealed: Boolean,
    isCorrect: Boolean,
    onSelect: () -> Unit
) {
    val borderColor = when {
        isRevealed && isCorrect -> SemanticSuccess
        isRevealed && isSelected && !isCorrect -> SemanticError
        isSelected -> MaterialTheme.colorScheme.primary
        else -> MaterialTheme.colorScheme.outline
    }
    Surface(
        shape = RoundedCornerShape(12.dp),
        border = BorderStroke(1.5.dp, borderColor),
        color = MaterialTheme.colorScheme.surface,
        modifier = Modifier
            .fillMaxWidth()
            .heightIn(min = 52.dp)
            .clickable(enabled = !isRevealed, onClick = onSelect)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(text = choice.text, modifier = Modifier.weight(1f))
        }
    }
}

@Composable
fun QuestionCard(
    question: Question,
    selectedChoiceId: String?,
    revealed: Boolean,
    onSelectChoice: (String) -> Unit
) {
    Surface(
        shape = RoundedCornerShape(18.dp),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline),
        color = MaterialTheme.colorScheme.surface,
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(20.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(
                text = "${question.difficulty} · ${question.sourceReference}",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Text(
                text = question.question,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.SemiBold
            )
            question.choices.forEach { ch ->
                AnswerOption(
                    choice = ch,
                    isSelected = selectedChoiceId == ch.id,
                    isRevealed = revealed,
                    isCorrect = ch.id == question.correctAnswerId,
                    onSelect = { onSelectChoice(ch.id) }
                )
            }
            if (revealed) {
                HorizontalDivider()
                Text(
                    text = question.explanation,
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
fun RoadSignCard(
    sign: RoadSign,
    onClick: () -> Unit
) {
    Surface(
        shape = RoundedCornerShape(16.dp),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline),
        color = MaterialTheme.colorScheme.surface,
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Image(
                painter = painterResource(id = sign.imageResource),
                contentDescription = sign.name,
                modifier = Modifier.size(64.dp)
            )
            Column(modifier = Modifier.weight(1f)) {
                Text(sign.name, fontWeight = FontWeight.SemiBold)
                Text(
                    sign.meaning,
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

@Composable
fun ResultSummary(
    totalQuestions: Int,
    correctAnswers: Int,
    incorrectAnswers: Int,
    onRetake: () -> Unit
) {
    val pct = if (totalQuestions > 0) (correctAnswers * 100) / totalQuestions else 0
    Surface(
        shape = RoundedCornerShape(18.dp),
        border = BorderStroke(1.dp, MaterialTheme.colorScheme.outline),
        color = MaterialTheme.colorScheme.surface,
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(modifier = Modifier.padding(24.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text("Practice Summary", style = MaterialTheme.typography.titleLarge, fontWeight = FontWeight.Bold)
            Text("Score: $pct% ($correctAnswers / $totalQuestions correct · $incorrectAnswers incorrect)")
            PrimaryButton(text = "Practice Again", onClick = onRetake)
        }
    }
}

@Composable
fun BottomNavigation(
    currentRoute: String,
    onNavigate: (String) -> Unit
) {
    val destinations = listOf(
        Triple("home", "Home", Icons.Outlined.Home),
        Triple("learn", "Learn", Icons.Outlined.MenuBook),
        Triple("practice", "Practice", Icons.Outlined.Quiz),
        Triple("mockexam", "Mock Exam", Icons.Outlined.FactCheck),
        Triple("profile", "Profile", Icons.Outlined.Person)
    )
    NavigationBar {
        destinations.forEach { (route, label, icon) ->
            NavigationBarItem(
                selected = currentRoute == route,
                onClick = { onNavigate(route) },
                icon = { Icon(icon, contentDescription = label) },
                label = { Text(label) }
            )
        }
    }
}
